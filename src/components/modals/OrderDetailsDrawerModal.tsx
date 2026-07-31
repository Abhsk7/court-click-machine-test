"use client";

import { Modal, Tabs } from "antd";
import { Order } from "@/types";

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0" }}>
      <span style={{ color: "#8a8189", fontSize: 13 }}>{label}:</span>
      <span style={{ fontWeight: 600, fontSize: 13, color: "#1c1418" }}>
        {value || "N/A"}
      </span>
    </div>
  );
}

export default function OrderDetailsDrawerModal({
  open,
  onClose,
  order,
}: {
  open: boolean;
  onClose: () => void;
  order: Order | null;
}) {
  if (!order) return null;
  const t = order.timeline;

  return (
    <Modal open={open} onCancel={onClose} footer={null} width={560} title="Order Details">
      <div
        style={{
          background: "#faf8f9",
          borderRadius: 12,
          padding: "12px 16px",
          marginBottom: 16,
        }}
      >
        <Row label="Order ID" value={order.orderId} />
        <Row label="Tracking ID" value={order.trackingId} />
        <Row label="Payment completed" value={t.paymentCompleted} />
        <Row label="Order placed" value={t.orderPlaced} />
        <Row label="Assigned" value={t.assigned} />
        <Row label="Applied" value={t.applied} />
        <Row label="Dispatched" value={t.dispatched} />
        <Row label="Delivered" value={t.delivered} />
      </div>

      <Tabs
        defaultActiveKey="case"
        items={[
          {
            key: "case",
            label: "Case & Customer Details",
            children: (
              <div style={{ background: "#faf8f9", borderRadius: 12, padding: "12px 16px" }}>
                <Row label="Case Number" value={order.caseDetails.caseNumber} />
                <Row label="Legal Name" value={order.caseDetails.legalName} />
                <Row label="Name" value={order.caseDetails.name} />
                <Row label="Email" value={order.caseDetails.email} />
                <Row label="Phone" value={order.caseDetails.phone} />
                <Row label="Delivery Feedback" value={order.caseDetails.deliveryFeedback} />
              </div>
            ),
          },
          {
            key: "address",
            label: "Address",
            children: (
              <div style={{ background: "#faf8f9", borderRadius: 12, padding: "12px 16px" }}>
                <Row label="Pincode" value={order.address.pincode} />
                <Row label="Address Line 1" value={order.address.addressLine1} />
                <Row label="Address Line 2" value={order.address.addressLine2} />
                <Row label="City" value={order.address.city} />
                <Row label="District" value={order.address.district} />
                <Row label="State" value={order.address.state} />
                <Row label="Country" value={order.address.country} />
              </div>
            ),
          },
          {
            key: "products",
            label: "Products",
            children: (
              <div style={{ background: "#faf8f9", borderRadius: 12, padding: "12px 16px" }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>Product 1</div>
                <Row label="Type" value={order.product.type} />
                <Row label="Order Date" value={order.product.orderDate} />
                <Row label="File" value={order.product.file} />
              </div>
            ),
          },
          {
            key: "esign",
            label: "Digio eSign Documents",
            children: (
              <div style={{ background: "#faf8f9", borderRadius: 12, padding: "12px 16px" }}>
                {order.eSign ? (
                  <>
                    <div style={{ fontWeight: 700, marginBottom: 6 }}>eSign 1</div>
                    <Row label="Digio ID" value={order.eSign.digioId} />
                    <Row label="Status" value={order.eSign.status} />
                    <Row label="Signed Document" value="View Signed Document" />
                    <Row label="Audit Log" value="View Audit Log" />
                  </>
                ) : (
                  <span style={{ color: "#8a8189", fontSize: 13 }}>No eSign documents yet.</span>
                )}
              </div>
            ),
          },
        ]}
      />
    </Modal>
  );
}
