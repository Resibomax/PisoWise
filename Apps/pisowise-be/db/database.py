import boto3
from urllib.parse import urlparse, urlunparse
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

SSM_PARAM_NAME = "/pisowise/db"
AWS_PROFILE = "pisowise"
AWS_REGION = "ap-southeast-1"


def get_ssm_client():
    session = boto3.Session(profile_name=AWS_PROFILE)
    return session.client("ssm")


def get_database_url():
    try:
        ssm = boto3.client("ssm", region_name=AWS_REGION)
        response = ssm.get_parameter(Name="/pisowise/db", WithDecryption=True)

        db_url = response["Parameter"]["Value"].strip()
        print(f"Raw Database URL fetched from SSM: {db_url}")

        if db_url.startswith("postgres://"):
            db_url = db_url.replace("postgres://", "postgresql://", 1)

        db_password = "xJ3tOmgpTwxxm49_E|H|TYhLv41a"

        parsed = urlparse(db_url)

        if not parsed.username:
            raise ValueError("Database URL must include username")

        new_path = "/pisowisedb" if parsed.path == "/psw-db-staging" else parsed.path
        # Rebuild netloc with username:password@host:port
        netloc = f"pisowise:{db_password}@{parsed.hostname}"
        if parsed.port:
            netloc += f":{parsed.port}"

        db_url = urlunparse(parsed._replace(netloc=netloc, path=new_path))

        print(f"Database URL fetched from SSM: {db_url}")
        return db_url

    except Exception as e:
        raise RuntimeError(f"Failed to fetch DB URL from SSM: {e}")


DATABASE_URL = get_database_url()

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
