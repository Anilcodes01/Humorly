import { getServerSession } from "next-auth";
import { authOptions } from "./utils/authOptions";

export default async function App() {
  const session = await getServerSession(authOptions);

  // Redirect to /info if the user is not logged in
  if (!session) {
    return <script>{`window.location.href = '/info'`}</script>;
  }

  // Render home page content if logged in
  return (
    <div className="min-h-screen flex items-center justify-center text-black">
      This is home page
    </div>
  );
}
