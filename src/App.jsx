import Navbar from "./components/Navbar";
import Claim from "./pages/Claim";
// import Action from "./components/Action";
import StatusTable from "./components/StatusTable";

export default function App() {
  return (
    <div>
      <Navbar />
      <Claim />
      {/* <Action /> */}
      <StatusTable />
    </div>
  );
}
