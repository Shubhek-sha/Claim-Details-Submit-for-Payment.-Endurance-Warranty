exports.getclaim = (req, res) => {
  res.json({
    id: "CL-2467802",
    type: "Mechanical",
    roNumber: "890790123412",
    date: "5 May 2024",
    client: "Albert Flores",
    assignedTo: "David Jackson",
    odo: "109,000 mi",
    statuses: [
      {
        label: "Authorized",
        amount: "$120.80",
        date: "24 March 2022 - 10:24 PM",
      },
      { label: "Pending", amount: "$95.25", date: "24 March 2022 - 09:30 AM" },
    ],
  });
};
