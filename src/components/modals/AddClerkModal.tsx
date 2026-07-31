"use client";

import { Modal, Form, Input, Button, Select } from "antd";
import { Clerk } from "@/types";

export default function AddClerkModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (clerk: Omit<Clerk, "id">) => void;
}) {
  const [form] = Form.useForm();

  const handleSave = async () => {
    const values = await form.validateFields();
    onSave({
      name: values.name,
      phone: `${values.countryCode}${values.phone}`,
      clerkId: values.clerkId,
    });
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={null}
      width={520}
      title="Add Clerk"
    >
      <p style={{ color: "#8a8189", fontSize: 13, marginTop: -8, marginBottom: 20 }}>
        Add a new authorized person by providing details
      </p>
      <Form form={form} layout="vertical" initialValues={{ countryCode: "+91" }}>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <Form.Item
            label="Clerk Name"
            name="name"
            style={{ flex: 1, minWidth: 200 }}
            rules={[{ required: true, message: "Clerk name is required" }]}
          >
            <Input placeholder="Enter clerk name" />
          </Form.Item>
          <Form.Item label="Phone Number" required style={{ flex: 1, minWidth: 200 }}>
            <Input.Group compact style={{ display: "flex" }}>
              <Form.Item name="countryCode" noStyle>
                <Select
                  style={{ width: 90 }}
                  options={[{ value: "+91", label: "🇮🇳 +91" }]}
                />
              </Form.Item>
              <Form.Item
                name="phone"
                noStyle
                rules={[
                  { required: true, message: "Phone number is required" },
                  { pattern: /^[0-9]{10}$/, message: "Enter a valid 10-digit number" },
                ]}
              >
                <Input style={{ flex: 1 }} placeholder="9876543210" />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </div>
        <Form.Item
          label="Clerk ID"
          name="clerkId"
          rules={[{ required: true, message: "Clerk ID is required" }]}
        >
          <Input placeholder="Enter Clerk ID" />
        </Form.Item>
      </Form>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 12 }}>
        <Button
          shape="round"
          onClick={() => {
            form.resetFields();
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button type="primary" shape="round" onClick={handleSave}>
          Add & Save
        </Button>
      </div>
    </Modal>
  );
}
