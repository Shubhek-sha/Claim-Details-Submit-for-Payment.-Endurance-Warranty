export default function Header({ claim }) {
  if (!claim) return null;

  return (
    <div className="p-6 bg-white shadow rounded-xl mb-6">
      <h1 className="text-2xl font-semibold">{claim.id}</h1>

      <div className="grid grid-cols-3 gap-4 mt-4 text-sm text-gray-600">
        <p>
          <strong>Type:</strong> {claim.type}
        </p>
        <p>
          <strong>RO Number:</strong> {claim.roNumber}
        </p>
        <p>
          <strong>Date:</strong> {claim.date}
        </p>
        <p>
          <strong>Client:</strong> {claim.client}
        </p>
        <p>
          <strong>Assigned To:</strong> {claim.assignedTo}
        </p>
        <p>
          <strong>Current ODO:</strong> {claim.odo}
        </p>
      </div>
    </div>
  );
}
