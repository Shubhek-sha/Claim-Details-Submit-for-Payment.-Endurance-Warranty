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
        // ---------------- Success Screen ----------------
        <Stack spacing="lg">
          <div>
            <Text weight={700} size="lg">
              You're all set!
            </Text>
            <Text color="dimmed" size="sm">
              Feel free to send us a message with any extra details or files
            </Text>
          </div>

          <div className="flex justify-center py-6">
            <img
              src="/mnt/data/frame_1.png"
              alt="check"
              style={{ width: 160 }}
            />
          </div>

          <Stack spacing="xs">
            <Group position="apart">
              <Text size="sm" color="teal">
                Invoice reviewing
              </Text>
              <Text size="sm" color="dimmed">
                29 July
              </Text>
            </Group>
            <Group position="apart">
              <Text size="sm" color="dimmed">
                Payment release
              </Text>
              <Text size="sm" color="dimmed">
                29 July
              </Text>
            </Group>
            <Group position="apart">
              <Text size="sm" color="dimmed">
                Money on your account
              </Text>
              <Text size="sm" color="dimmed">
                30 July
              </Text>
            </Group>
          </Stack>

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
              onClick={() => alert("Message feature not implemented")}
              disabled={loading}
            >
              Send message
            </Button>
          </Group>
        </Stack>
      ) : (
        // ---------------- Form Screen ----------------
        <Stack spacing="sm">
          <div>
            <Text weight={700} size="lg">
              Submit for payment
            </Text>
            <Text color="dimmed" size="sm">
              You need to upload invoice, and confirm payment method
            </Text>
          </div>

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

          {/* Upload Invoice */}
          <div>
            <Text size="sm" weight={600} mb={8}>
              Upload Invoice
            </Text>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const f = e.dataTransfer.files?.[0];
                if (f) setSelectedFile(f);
              }}
              className="border-dashed border-2 border-gray-200 rounded-md p-6 text-center"
              style={{ cursor: "pointer" }}
              onClick={() => fileInputRef.current.click()}
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
              <Text size="xs" color="gray">
                Word, PDF, JPEG, PNG (Max 4mb)
              </Text>
              {selectedFile && (
                <div className="mt-3 text-sm">
                  <Text size="sm" weight={700}>
                    {selectedFile.name}
                  </Text>
                  <Text size="xs" color="dimmed">
                    {(selectedFile.size / 1024).toFixed(0)} KB
                  </Text>
                </div>
              )}
            </div>
          </div>

          {/* Select existing invoice */}
          <div>
            <Group position="apart">
              <Text size="sm" weight={600}>
                Select Invoice from Files
              </Text>
              <Text size="sm" color="dimmed">
                See All
              </Text>
            </Group>
            <ScrollArea style={{ height: 90 }} mt="sm">
              <Group spacing="sm" align="stretch">
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
                      <div>
                        <Text weight={600} size="sm" truncate>
                          {f.name}
                        </Text>
                        <Text size="xs" color="dimmed">
                          {f.preview || "Invoice"}
                        </Text>
                      </div>
                    </Group>
                  </Card>
                ))}
              </Group>
            </ScrollArea>
          </div>

          <Divider />

          {/* Payment Method */}
          <div>
            <Text size="sm" weight={600} mb={8}>
              Payment method
            </Text>
            <Select
              value={paymentMethod}
              onChange={setPaymentMethod}
              data={paymentOptions}
            />
          </div>

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
