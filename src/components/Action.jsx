import { Tabs } from "@mantine/core";
import ChatBox from "./ChatBox";
import NotesBox from "./NotesBox";
import FileBox from "./FileBox";

export default function Action() {
  return (
    <Tabs defaultValue="actions">
      <Tabs.List className="flex items-center gap-5 text-sm text-gray-600">
        <Tabs.Tab value="actions">Actions</Tabs.Tab>
        <Tabs.Tab value="sublets">Sublets</Tabs.Tab>
        <Tabs.Tab value="services">Services</Tabs.Tab>
        <Tabs.Tab value="totals">Totals</Tabs.Tab>
        <Tabs.Tab value="other">Others</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="actions" pt="xs">
        <div className="grid grid-cols-3 gap-6 mt-4">
          <ChatBox />
          <NotesBox />
          <FileBox />
        </div>
      </Tabs.Panel>
    </Tabs>
  );
}
