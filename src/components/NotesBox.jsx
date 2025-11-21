import { Textarea } from "@mantine/core";

export default function NotesBox() {
  return (
    <div className="p-4 border rounded-xl bg-white shadow">
      <h2 className="font-medium mb-3">Notes</h2>
      <Textarea placeholder="Write notes here..." minRows={4} />
    </div>
  );
}
