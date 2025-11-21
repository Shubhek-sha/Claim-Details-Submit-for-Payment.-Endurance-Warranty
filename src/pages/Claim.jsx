import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import StatusTable from "../components/StatusTable";
import Action from "../components/Action";

export default function Claim() {
  const [claim, setClaim] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/claims/123")
      .then((res) => setClaim(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <Header claim={claim} />
      <StatusTable statuses={claim?.statuses || []} />
      <Action />
    </div>
  );
}
