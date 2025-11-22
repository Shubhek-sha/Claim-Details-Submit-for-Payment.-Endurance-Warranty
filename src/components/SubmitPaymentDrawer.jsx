import React, { useState, useRef } from "react";
import {
  Drawer,
  Button,
  Text,
  Group,
  Card,
  Checkbox,
  Stack,
  Avatar,
  Select,
  ScrollArea,
  Divider,
} from "@mantine/core";
import { IconUpload, IconFile } from "@tabler/icons-react";
import axios from "axios";

export default function SubmitPaymentDrawer({
  opened,
  onClose,
  claimId,
  existingFiles = [],
}) {
  const [invoiceTotal] = useState("$300.55");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedExisting, setSelectedExisting] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("Wire Transfer");
  const [agreeAll, setAgreeAll] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef();

  const paymentOptions = [
    { value: "Wire Transfer", label: "Wire Transfer — Ending in 9536" },
    { value: "Check", label: "Check" },
  ];

  async function uploadFile(file) {
    if (!file) return null;
    const form = new FormData();
    form.append("file", file);
    const res = await axios.post("http://localhost:5000/api/upload", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.file;
  }

  async function handleSubmit() {
    if (!agreeAll)
      return alert("Please confirm all related invoices are provided.");
    setLoading(true);
    try {
      let uploaded = null;
      if (selectedFile) uploaded = await uploadFile(selectedFile);

      const payload = {
        claimId,
        invoice: selectedExisting
          ? existingFiles.find((f) => f.id === selectedExisting)
          : uploaded,
        paymentMethod,
      };

      await axios.post("http://localhost:5000/api/claims/submit", payload);
      setShowSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Submission failed. See console.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Drawer
      opened={opened}
      onClose={() => {
        setShowSuccess(false);
        onClose();
      }}
      position="right"
      size={420}
      padding="xl"
    >
      {showSuccess ? (
        <Stack spacing="lg">
          <Text weight={700} size="lg">
            You're all set!
          </Text>
          <Text color="dimmed" size="sm">
            Feel free to send us a message with any extra details or files
          </Text>
          <div className="flex justify-center py-6">
            <img
              src="/mnt/data/frame_1.png"
              alt="check"
              style={{ width: 160 }}
            />
          </div>
          <Group position="apart" mt="md">
            <Button
              variant="default"
              onClick={() => {
                setShowSuccess(false);
                onClose();
              }}
            >
              Back home
            </Button>
            <Button
              onClick={() => alert("Message not implemented")}
              disabled={loading}
            >
              Send message
            </Button>
          </Group>
        </Stack>
      ) : (
        <Stack spacing="sm">
          <Text weight={700} size="lg">
            Submit for payment
          </Text>
          <Text color="dimmed" size="sm">
            Upload invoice and confirm payment method
          </Text>

          <Card radius="md" withBorder>
            <Group position="apart">
              <Group>
                <Avatar radius="xl" color="green">
                  ✔
                </Avatar>
                <div>
                  <Text size="sm" weight={600}>
                    {invoiceTotal}
                  </Text>
                  <Text size="xs" color="dimmed">
                    Invoice total
                  </Text>
                </div>
              </Group>
            </Group>
          </Card>

          <div
            onClick={() => fileInputRef.current.click()}
            className="border-dashed border-2 border-gray-200 rounded-md p-6 text-center"
            style={{ cursor: "pointer" }}
          >
            <input
              ref={fileInputRef}
              type="file"
              hidden
              onChange={(e) => setSelectedFile(e.target.files?.[0])}
            />
            <IconUpload size={18} />
            <Text size="sm" color="dimmed">
              Drag and drop files or{" "}
              <span style={{ textDecoration: "underline" }}>click here</span>
            </Text>
            {selectedFile && <Text>{selectedFile.name}</Text>}
          </div>

          <ScrollArea style={{ height: 90 }} mt="sm">
            <Group spacing="sm">
              {existingFiles.map((f) => (
                <Card
                  key={f.id}
                  withBorder
                  padding="sm"
                  className={`cursor-pointer ${
                    selectedExisting === f.id ? "border-black" : ""
                  }`}
                  onClick={() => setSelectedExisting(f.id)}
                  style={{ minWidth: 110 }}
                >
                  <Group>
                    <IconFile />
                    <Text size="sm" weight={600}>
                      {f.name}
                    </Text>
                  </Group>
                </Card>
              ))}
            </Group>
          </ScrollArea>

          <Divider />

          <Text size="sm" weight={600}>
            Payment method
          </Text>
          <Select
            value={paymentMethod}
            onChange={setPaymentMethod}
            data={paymentOptions}
          />

          <Checkbox
            mt="sm"
            checked={agreeAll}
            onChange={(e) => setAgreeAll(e.currentTarget.checked)}
            label="All related invoices are provided"
          />

          <Group position="apart" mt="md">
            <Button variant="default" onClick={onClose}>
              Cancel
            </Button>
            <Button loading={loading} onClick={handleSubmit}>
              Submit for payment
            </Button>
          </Group>
        </Stack>
      )}
    </Drawer>
  );
}
