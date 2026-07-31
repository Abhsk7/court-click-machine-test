"use client";

import { Modal, Button } from "antd";
import { EditOutlined, DeleteOutlined, TagOutlined } from "@ant-design/icons";
import { TagInfo } from "@/types";
import { tagPalette } from "@/theme/tokens";

export default function ChooseTagModal({
  open,
  onClose,
  tags,
  onSelect,
  onCreateNew,
  onEdit,
  onDelete,
}: {
  open: boolean;
  onClose: () => void;
  tags: TagInfo[];
  onSelect: (tag: TagInfo) => void;
  onCreateNew: () => void;
  onEdit: (tag: TagInfo) => void;
  onDelete: (tag: TagInfo) => void;
}) {
  return (
    <Modal open={open} onCancel={onClose} title="Choose tag" footer={null} width={380}>
      <Button
        icon={<TagOutlined />}
        block
        shape="round"
        style={{ marginBottom: 14, textAlign: "left" }}
        onClick={onCreateNew}
      >
        Create New Tag
      </Button>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {tags.map((tag) => {
          const palette = tagPalette[tag.color] ?? tagPalette.grey;
          return (
            <div
              key={tag.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <span
                onClick={() => onSelect(tag)}
                style={{
                  cursor: "pointer",
                  background: palette.bg,
                  color: palette.fg,
                  borderRadius: 20,
                  padding: "5px 14px",
                  fontSize: 12,
                  fontWeight: 500,
                }}
              >
                {tag.label}
              </span>
              <span style={{ display: "flex", gap: 10, color: "#a49aa2" }}>
                <EditOutlined
                  style={{ cursor: "pointer" }}
                  onClick={() => onEdit(tag)}
                />
                <DeleteOutlined
                  style={{ cursor: "pointer" }}
                  onClick={() => onDelete(tag)}
                />
              </span>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}
