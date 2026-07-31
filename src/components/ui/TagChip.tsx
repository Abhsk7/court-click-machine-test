"use client";

import { CloseOutlined } from "@ant-design/icons";
import { TagInfo } from "@/types";
import { tagPalette } from "@/theme/tokens";

export default function TagChip({
  tag,
  onRemove,
}: {
  tag: TagInfo;
  onRemove?: (id: string) => void;
}) {
  const palette = tagPalette[tag.color] ?? tagPalette.grey;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        background: palette.bg,
        color: palette.fg,
        borderRadius: 20,
        padding: "3px 6px 3px 10px",
        fontSize: 11,
        fontWeight: 500,
        lineHeight: 1.6,
        whiteSpace: "nowrap",
      }}
    >
      {tag.label}
      {onRemove && (
        <button
          onClick={() => onRemove(tag.id)}
          aria-label={`Remove ${tag.label}`}
          style={{
            border: "none",
            background: "rgba(0,0,0,0.25)",
            color: "#fff",
            width: 14,
            height: 14,
            borderRadius: "50%",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            fontSize: 8,
            padding: 0,
          }}
        >
          <CloseOutlined style={{ fontSize: 7 }} />
        </button>
      )}
    </span>
  );
}
