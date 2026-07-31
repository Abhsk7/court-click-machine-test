"use client";

import { Modal, Button, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { Order } from "@/types";

export default function OrderDetailsSimpleModal({
  open,
  onClose,
  order,
}: {
  open: boolean;
  onClose: () => void;
  order: Order | null;
}) {
  if (!order) return null;

  const rows: [string, string][] = [
    ["Applicant", `${order.caseDetails.name} (Petitioner)`],
    ["Case Number", order.caseDetails.caseNumber],
    ["Case Name", `${order.caseDetails.name} & Other vs State Of Kerala & Others`],
    ["CNR Number", "KLHC010922112023"],
    ["Court Establishment", `JFCM 1 ${order.courtComplex}`],
    ["Document Type", `Certified True Copy - ${order.productType}`],
    ["Order Number", "1/2026"],
    ["Order Date", order.orderDate],
  ];

  const handleCopy = () => {
    const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
    navigator.clipboard?.writeText(text);
    message.success("Order details copied");
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={480}
      title={
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 20, fontWeight: 700 }}>Order Details</span>
          <Button
            icon={<CopyOutlined />}
            onClick={handleCopy}
            style={{ marginRight: 24 }}
          >
            Copy Details
          </Button>
        </div>
      }
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 18, marginTop: 8 }}>
        {rows.map(([label, value]) => (
          <div key={label}>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.04em",
                color: "#a9a0a7",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              {label}
            </div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#1c1418" }}>{value}</div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
