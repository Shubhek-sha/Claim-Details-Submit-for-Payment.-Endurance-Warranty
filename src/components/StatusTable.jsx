export default function StatusTable({ statuses = [] }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow mb-6">
      {statuses.map((s, i) => (
        <div
          key={i}
          className="flex justify-between py-3 border-b last:border-none"
        >
          <p>{s.label}</p>
          <p>{s.amount}</p>
          <p>{s.date}</p>
        </div>
      ))}
    </div>
  );
}
