"use client";

import { OrderStatus } from "@/types";

const STATUS_STYLES: Record<OrderStatus, { color: string; bg: string; border: string }> = {
  cancelled: { color: "#c0392b", bg: "#fdf1ef", border: "#f0c4bc" },
  "order placed": { color: "#2f8f4e", bg: "#eef8f0", border: "#bfe4c8" },
  "payment completed": { color: "#c98a1f", bg: "#fdf6e8", border: "#eeddb0" },
  assigned: { color: "#5c7a99", bg: "#eef3f7", border: "#c4d6e4" },
  applied: { color: "#8d7ab5", bg: "#f4f1fa", border: "#d7ccec" },
  dispatched: { color: "#5e9b8e", bg: "#eef8f6", border: "#bfe0d8" },
  delivered: { color: "#2f8f4e", bg: "#eef8f0", border: "#bfe4c8" },
};

export default function StatusBadge({ status }: { status: OrderStatus }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES["order placed"];
  return (
    <span
      style={{
        display: "inline-block",
        color: style.color,
        background: style.bg,
        border: `1px solid ${style.border}`,
        borderRadius: 20,
        padding: "3px 12px",
        fontSize: 11,
        fontWeight: 600,
        textTransform: "capitalize",
      }}
    >
      {status}
    </span>
  );
}
