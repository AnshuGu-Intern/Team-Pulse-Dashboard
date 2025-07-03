import Header from "./components/Header";
import TeamLeadView from "./pages/dashboard/TeamLeadView";
import TeamMemberView from "./pages/dashboard/TeamMemberView";
import Seo from "./components/Seo";
import { useSelector } from "react-redux";

function App() {
  const currentRole = useSelector((state) => state.role.currentRole);
  const darkMode = useSelector((state) => state.ui.darkMode);

  return (
    <>
      <Seo
        title="Team Pulse"
        description="The central productivity monitoring and task management dashboard for your team. Empowering Team Leads and Team Members."
        image="/team-pulse-og-image.png"
      />
      <div
        className={`min-h-screen transition-colors duration-300 ${
          darkMode
            ? "bg-stone-800 text-stone-100"
            : "bg-stone-50 text-stone-900"
        }`}
      >
        <Header />
        <main className="container mx-auto px-4 py-2">
          {currentRole === "lead" ? <TeamLeadView /> : <TeamMemberView />}
        </main>
      </div>
    </>
  );
}

export default App;
