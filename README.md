# PisoWise

A comprehensive expense tracking and project management application that helps users manage budgets, track receipts, and gain AI-powered insights into their spending patterns.

## Architecture

**Frontend**: Next.js 15 with TypeScript, React 19, and Tailwind CSS <br>
**Backend**: FastAPI with Python 3.11, deployed as serverless functions <br>
**Database**: PostgreSQL with SQLAlchemy ORM and Alembic migrations <br>
**Cloud Infrastructure**: AWS (Lambda, S3, Textract, Cognito) <br>
**Authentication**: AWS Cognito with OAuth integration <br>
**Deployment**: Serverless Framework with GitHub Actions CI/CD <br>

## Key Services & Frameworks

### Frontend Stack
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **ShadCN UI** - Additional UI components
- **Zustand** - State management
- **AWS Amplify** - Authentication integration
- **Axios** - HTTP client for API calls

### Backend Stack
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - Database ORM
- **Alembic** - Database migrations
- **Mangum** - ASGI adapter for AWS Lambda
- **Boto3** - AWS SDK for Python
- **Pydantic** - Data validation and serialization

### AWS Services
- **Lambda** - Serverless compute for API and document processing
- **S3** - File storage for receipt images
- **Textract** - OCR for receipt data extraction
- **Cognito** - User authentication and authorization
- **RDS/PostgreSQL** - Relational database

## Application Overview

PisoWise is a smart expense tracking application that enables users to:

### Core Features
- **Project Management**: Create and manage multiple expense projects with budgets
- **Receipt Processing**: Upload receipt images with automatic OCR text extraction
- **Expense Tracking**: Categorize and track individual items and expenses
- **Budget Monitoring**: Real-time budget vs. actual spending analysis
- **AI Insights**: Generate intelligent spending insights and recommendations
- **User Authentication**: Secure login with AWS Cognito integration

### Data Models
- **Users**: Account management with email/username
- **Projects**: Budget-based expense containers
- **Receipts**: Transaction records with vendor and date information
- **Items**: Individual line items from receipts
- **AI Insights**: Generated spending analysis and recommendations

### Key Workflows
1. **User Registration/Login**: OAuth-based authentication via AWS Cognito
2. **Project Creation**: Set up expense projects with budgets and descriptions
3. **Receipt Upload**: Upload images to S3, trigger Textract for OCR processing
4. **Expense Entry**: Manual or automated expense item creation from receipts
5. **Budget Tracking**: Real-time calculation of spent vs. remaining budget
6. **Insight Generation**: AI-powered analysis of spending patterns

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- AWS CLI configured
- PostgreSQL database

### Frontend Setup
```bash
cd Apps/pisowise-fe
npm install
cp .env.local.example .env.local  # Configure environment variables
npm run dev
```

### Backend Setup
```bash
cd Apps/pisowise-be
pip install -r requirements.txt
cp .env.example .env  # Configure database and AWS credentials
alembic upgrade head  # Run database migrations
```

### Local Development
```bash
# Frontend (Next.js dev server)
cd Apps/pisowise-fe && npm run dev

# Backend (FastAPI with uvicorn)
cd Apps/pisowise-be && uvicorn app:app --reload
```

### Deployment
The application uses GitHub Actions for automated deployment:
- **Staging**: Deploys on push to `staging` branch
- **Production**: Deploys on push to `main` branch
- **Serverless Framework**: Handles AWS Lambda deployment
- **Environment**: Configured for `ap-southeast-1` region

### Environment Variables
Configure the following in your `.env` files:
- Database connection strings
- AWS credentials and region
- Cognito user pool configuration
- S3 bucket names
- API endpoints

## Project Structure
```
PisoWise/
├── Apps/
│   ├── pisowise-fe/          # Next.js frontend
│   └── pisowise-be/          # FastAPI backend
├── lambdas/
│   └── textract-trigger/     # S3 event handler for OCR
└── .github/workflows/        # CI/CD pipelines
```

The application follows a clean architecture pattern with separation of concerns across controllers, use cases, repositories, and models.
