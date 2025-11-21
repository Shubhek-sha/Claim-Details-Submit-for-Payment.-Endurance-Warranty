// export default function StatusTable({ statuses = [] }) {
//   return (
//     <div className="bg-white p-6 rounded-xl shadow mb-6">
//       {statuses.map((s, i) => (
//         <div
//           key={i}
//           className="flex justify-between py-3 border-b last:border-none"
//         >
//           <p>{s.label}</p>
//           <p>{s.amount}</p>
//           <p>{s.date}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
import { Button, Card } from "@mantine/core";

export default function StatusTable({ statuses = [] }) {
  return (
    <div className="w-full max-w-3xl mx-auto mt-10">
      <Card
        shadow="sm"
        padding="lg"
        radius="lg"
        className="border border-gray-200"
      >
        <div className="grid grid-cols-3 text-sm font-semibold text-gray-500 pb-3 border-b mb-4">
          <span>STATUS</span>
          <span>DETAILS</span>
          <span className="text-right">ACTIONS</span>
        </div>

        {statuses.map((s, i) => (
          <div
            key={i}
            className="grid grid-cols-3 items-center py-3 border-b last:border-none"
          >
            {/* STATUS COLUMN */}
            <div className="flex items-center gap-2">
              {s.label ? (
                <>
                  <span
                    className={`h-3 w-3 rounded-full ${
                      s.label === "Authorized"
                        ? "bg-green-500"
                        : s.label === "Pending"
                        ? "bg-orange-400"
                        : "bg-gray-400"
                    }`}
                  />
                  <span className="text-gray-800 font-medium">{s.label}</span>
                </>
              ) : (
                <span className="text-gray-500">—</span>
              )}
            </div>

            {/* DETAILS COLUMN */}
            <div className="text-gray-700">
              {s.amount ? (
                <>
                  <span className="font-semibold">{s.amount}</span>
                  <span className="mx-2 text-gray-400">•</span>
                  {s.date}
                  <span className="mx-2 text-gray-400">•</span>
                  {s.time}
                </>
              ) : (
                <span className="text-gray-400">No details</span>
              )}
            </div>

            {/* ACTION COLUMN */}
            <div className="text-right">
              {s.actionButton ? (
                <Button variant="filled" color="dark" radius="xl" size="xs">
                  {s.actionButton}
                </Button>
              ) : (
                <span className="text-gray-400 text-sm">—</span>
              )}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
