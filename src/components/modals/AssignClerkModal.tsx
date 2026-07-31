"use client";

import { Modal, Button, Checkbox, Select, Avatar } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Clerk } from "@/types";

export default function AssignClerkModal({
  open,
  onClose,
  clerks,
  onAssign,
  onAddNew,
}: {
  open: boolean;
  onClose: () => void;
  clerks: Clerk[];
  onAssign: (clerk: Clerk) => void;
  onAddNew: () => void;
}) {
  const [selected, setSelected] = useState<string[]>([]);

  const handleAssign = () => {
    const clerk = clerks.find((c) => c.id === selected[0]);
    if (clerk) onAssign(clerk);
    setSelected([]);
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={460}
      title={
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>Assign Authorized Personnel</span>
          <Button
            type="primary"
            shape="round"
            size="small"
            icon={<PlusOutlined />}
            onClick={onAddNew}
            style={{ marginRight: 24 }}
          >
            Add New
          </Button>
        </div>
      }
    >
      <p style={{ color: "#8a8189", fontSize: 13, marginTop: -6, marginBottom: 18 }}>
        Select the person who is authorized to collect CTC document.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {clerks.slice(0, 3).map((clerk) => (
          <label
            key={clerk.id}
            style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
          >
            <Checkbox
              checked={selected.includes(clerk.id)}
              onChange={() => setSelected([clerk.id])}
            />
            <Avatar icon={<UserOutlined />} />
            <span style={{ fontWeight: 500 }}>{clerk.name}</span>
          </label>
        ))}
      </div>
      <div style={{ marginTop: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>More Clerks</div>
        <Select
          style={{ width: "100%" }}
          placeholder="Choose Clerks"
          options={clerks.map((c) => ({ value: c.id, label: c.name }))}
          onChange={(val) => setSelected([val])}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24 }}>
        <Button shape="round" onClick={onClose}>
          Cancel
        </Button>
        <Button type="primary" shape="round" onClick={handleAssign} disabled={!selected.length}>
          Assign Personnel
        </Button>
      </div>
    </Modal>
  );
}
