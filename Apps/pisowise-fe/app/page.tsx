import Landing from "./landing";
import RedirectIfAuthenticated from "./landing/components/RedirectIfAuthenticated";

export default function Home() {
  return (
    <RedirectIfAuthenticated>
      <Landing />
    </RedirectIfAuthenticated>
  );
}
