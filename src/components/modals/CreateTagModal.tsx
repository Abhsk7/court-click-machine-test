"use client";

import { Modal, Button, Input, Form } from "antd";
import { useState } from "react";
import { swatchColors } from "@/theme/tokens";

export default function CreateTagModal({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, color: string) => void;
}) {
  const [name, setName] = useState("");
  const [color, setColor] = useState<string | null>(null);

  const reset = () => {
    setName("");
    setColor(null);
  };

  return (
    <Modal
      open={open}
      onCancel={() => {
        reset();
        onClose();
      }}
      footer={null}
      width={420}
      title="Support Tags"
    >
      <p style={{ color: "#8a8189", fontSize: 13, marginTop: -8, marginBottom: 20 }}>
        Create new tags here
      </p>
      <Form layout="vertical">
        <Form.Item label="New Tag Name">
          <Input
            placeholder="Enter Tag Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="Choose Tag Color">
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {swatchColors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                aria-label={`Choose color ${c}`}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: c,
                  border: color === c ? "2px solid #1c1418" : "2px solid transparent",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </Form.Item>
      </Form>
      <div style={{ borderTop: "1px solid #eee", paddingTop: 14 }}>
        <div style={{ fontSize: 12, color: "#a9a0a7", marginBottom: 8 }}>Preview</div>
        {name && color ? (
          <span
            style={{
              display: "inline-block",
              background: color,
              color: "#fff",
              borderRadius: 20,
              padding: "5px 14px",
              fontSize: 12,
              fontWeight: 500,
            }}
          >
            {name}
          </span>
        ) : (
          <span style={{ fontSize: 12, color: "#c7bec5" }}>
            Enter a name and pick a color to preview
          </span>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
        <Button
          shape="round"
          onClick={() => {
            reset();
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          shape="round"
          disabled={!name || !color}
          onClick={() => {
            if (name && color) {
              onCreate(name, color);
              reset();
              onClose();
            }
          }}
        >
          Add Tag
        </Button>
      </div>
    </Modal>
  );
}
