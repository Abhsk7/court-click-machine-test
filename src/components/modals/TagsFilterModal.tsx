"use client";

import { Modal, Button, Checkbox } from "antd";
import { useState, useEffect } from "react";
import { availableTags } from "@/data/mockData";
import TagChip from "@/components/ui/TagChip";

export default function TagsFilterModal({
  open,
  onClose,
  selected,
  onApply,
}: {
  open: boolean;
  onClose: () => void;
  selected: string[];
  onApply: (ids: string[]) => void;
}) {
  const [checked, setChecked] = useState<string[]>(selected);

  useEffect(() => setChecked(selected), [selected, open]);

  const toggle = (id: string) => {
    setChecked((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  };

  return (
    <Modal open={open} onCancel={onClose} title="Tags Quick Filter" footer={null} width={420}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 8 }}>
        {availableTags.map((tag) => (
          <label
            key={tag.id}
            style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
          >
            <Checkbox checked={checked.includes(tag.id)} onChange={() => toggle(tag.id)} />
            <TagChip tag={tag} />
          </label>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 }}>
        <Button shape="round" onClick={() => setChecked([])}>
          Reset Filter
        </Button>
        <Button
          type="primary"
          shape="round"
          onClick={() => {
            onApply(checked);
            onClose();
          }}
        >
          Apply
        </Button>
      </div>
    </Modal>
  );
}
