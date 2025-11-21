import { Textarea } from "@mantine/core";

export default function ChatBox() {
  return (
    <div className="p-4 border rounded-xl bg-white shadow">
      <h2 className="font-medium mb-3">Support Chat</h2>
      <Textarea placeholder="Type your message..." minRows={4} />
    </div>
  );
}
