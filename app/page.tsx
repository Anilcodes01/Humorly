import { getServerSession } from "next-auth";
import { authOptions } from "./utils/authOptions";

export default async function App() {
  const session = await getServerSession(authOptions);

 
  if (!session) {
    return <script>{`window.location.href = '/info'`}</script>;
  }

  
  return (
    <div className="min-h-screen flex items-center justify-center text-black">
      This is home page
    </div>
  );
}
