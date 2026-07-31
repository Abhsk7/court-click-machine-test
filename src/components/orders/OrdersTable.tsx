"use client";

import { Table, Select, Button, message, Pagination, Empty } from "antd";
import {
  CopyOutlined,
  EyeOutlined,
  FileProtectOutlined,
  EditOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  PlusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import type { ColumnsType } from "antd/es/table";
import { Order, OrderStatus } from "@/types";
import StatusBadge from "@/components/ui/StatusBadge";
import TagChip from "@/components/ui/TagChip";
import useMediaQuery from "@/hooks/useMediaQuery";
import styles from "./OrdersTable.module.css";

const STATUS_OPTIONS: OrderStatus[] = [
  "order placed",
  "payment completed",
  "assigned",
  "applied",
  "dispatched",
  "delivered",
  "cancelled",
];

interface Props {
  orders: Order[];
  loading?: boolean;
  expanded?: boolean;
  onView: (order: Order) => void;
  onEsign: (order: Order) => void;
  onChooseTag: (order: Order) => void;
  onAssignClerk: (order: Order) => void;
  onEditClerk: (order: Order) => void;
  onRemoveTag: (order: Order, tagId: string) => void;
  onStatusChange: (order: Order, status: OrderStatus) => void;
  onUploadEcopy?: (order: Order) => void;
}

export default function OrdersTable({
  orders,
  loading,
  expanded,
  onView,
  onEsign,
  onChooseTag,
  onAssignClerk,
  onEditClerk,
  onRemoveTag,
  onStatusChange,
  onUploadEcopy,
}: Props) {
  const isMobile = useMediaQuery("(max-width: 860px)");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const copy = (text: string, label: string) => {
    navigator.clipboard?.writeText(text);
    message.success(`${label} copied`);
  };

  if (!orders.length) {
    return (
      <div className={styles.emptyWrap}>
        <Empty description="No orders match your filters" />
      </div>
    );
  }

  if (isMobile) {
    const start = (page - 1) * pageSize;
    const pageOrders = orders.slice(start, start + pageSize);
    return (
      <div>
        <div className={styles.cardList}>
          {pageOrders.map((order, idx) => (
            <div key={order.id} className={styles.card}>
              <div className={styles.cardHeaderRow}>
                <span className={styles.cardIndex}>#{start + idx + 1}</span>
                <StatusBadge status={order.status} />
              </div>
              <div className={styles.cardName}>{order.applicantName}</div>
              <div className={styles.cardMeta}>
                <span onClick={() => copy(order.phone, "Phone")} className={styles.copyLine}>
                  {order.phone} <CopyOutlined />
                </span>
                <span>{order.caseNumber}</span>
              </div>
              <div className={styles.cardDivider} />
              <div className={styles.cardRow}>
                <span className={styles.cardLabel}>Court</span>
                <span>{order.courtComplex}</span>
              </div>
              <div className={styles.cardRow}>
                <span className={styles.cardLabel}>Product</span>
                <span>{order.productLabel}</span>
              </div>
              <div className={styles.cardRow}>
                <span className={styles.cardLabel}>Order Date</span>
                <span>
                  {order.orderDate} · {order.orderTime}
                </span>
              </div>
              <div className={styles.cardTags}>
                {order.tags.map((t) => (
                  <TagChip key={t.id} tag={t} onRemove={(id) => onRemoveTag(order, id)} />
                ))}
                <button className={styles.addTagBtn} onClick={() => onChooseTag(order)}>
                  <PlusCircleOutlined />
                </button>
              </div>
              <div className={styles.cardActions}>
                <Button size="small" shape="round" onClick={() => onView(order)}>
                  View
                </Button>
                <Button size="small" type="link" onClick={() => onEsign(order)}>
                  E-sign
                </Button>
                {order.clerk ? (
                  <span className={styles.clerkTag}>{order.clerk.name}</span>
                ) : (
                  <Button size="small" type="primary" onClick={() => onAssignClerk(order)}>
                    Assign
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className={styles.paginationWrap}>
          <Pagination
            current={page}
            pageSize={pageSize}
            total={orders.length}
            onChange={setPage}
            showSizeChanger={false}
            simple
          />
        </div>
      </div>
    );
  }

  const columns: ColumnsType<Order> = [
    {
      title: "#",
      dataIndex: "id",
      width: 46,
      render: (_: unknown, __: Order, index: number) => (
        <span className={styles.rowIndex}>{index + 1}</span>
      ),
    },
    {
      title: "User Info",
      key: "user",
      width: 210,
      render: (_, order) => (
        <div>
          <div className={styles.userName}>{order.applicantName}</div>
          <div className={styles.copyLine} onClick={() => copy(order.phone, "Phone number")}>
            {order.phone} <CopyOutlined style={{ fontSize: 11 }} />
          </div>
          <div className={styles.caseNo}>{order.caseNumber}</div>
          <Button
            size="small"
            className={styles.copyAddressBtn}
            icon={<CopyOutlined />}
            onClick={() =>
              copy(
                `${order.applicantName}\n${order.address.addressLine1}, ${order.address.addressLine2}, ${order.address.city}, ${order.address.state}, ${order.address.pincode}`,
                "Address"
              )
            }
          >
            Copy Address
          </Button>
        </div>
      ),
    },
    {
      title: "Court Complex",
      key: "court",
      width: 170,
      render: (_, order) => (
        <div>
          <div className={styles.bold}>{order.courtComplex}</div>
          <div className={styles.muted}>{order.district}</div>
        </div>
      ),
    },
    {
      title: "Products",
      key: "products",
      width: 190,
      render: (_, order) => (
        <div>
          <div className={styles.bold}>{order.productLabel}</div>
          <div className={styles.muted}>{order.productSubLabel}</div>
        </div>
      ),
    },
    {
      title: "Order Date",
      key: "date",
      width: 130,
      render: (_, order) => (
        <div>
          <div className={styles.bold}>{order.orderDate}</div>
          <div className={styles.muted}>{order.orderTime}</div>
        </div>
      ),
    },
    {
      title: "Status",
      key: "status",
      width: 170,
      render: (_, order) => (
        <div>
          <Select
            size="small"
            value="Update status"
            variant="borderless"
            className={styles.statusSelect}
            onChange={(v) => onStatusChange(order, v as OrderStatus)}
            options={STATUS_OPTIONS.map((s) => ({ value: s, label: s }))}
          />
          <div style={{ marginTop: 4 }}>
            <StatusBadge status={order.status} />
          </div>
        </div>
      ),
    },
    {
      title: "Order Details / E-Sign",
      key: "details",
      width: 130,
      render: (_, order) => (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <Button size="small" icon={<EyeOutlined />} onClick={() => onView(order)}>
            View
          </Button>
          <span className={styles.esignLink} onClick={() => onEsign(order)}>
            <FileProtectOutlined /> E-sign
          </span>
        </div>
      ),
    },
    {
      title: "Tags / Note",
      key: "tags",
      width: 220,
      render: (_, order) => (
        <div>
          <Button
            size="small"
            className={styles.chooseTagBtn}
            onClick={() => onChooseTag(order)}
          >
            Choose Tag <EditOutlined />
          </Button>
          <div className={styles.tagWrap}>
            {order.tags.map((t) => (
              <TagChip key={t.id} tag={t} onRemove={(id) => onRemoveTag(order, id)} />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "Clerk",
      key: "clerk",
      width: 150,
      render: (_, order) =>
        order.clerk ? (
          <div>
            <div className={styles.bold}>{order.clerk.name}</div>
            <div className={styles.clerkIcons}>
              <EditOutlined onClick={() => onEditClerk(order)} />
              <DeleteOutlined />
              <ShareAltOutlined />
            </div>
          </div>
        ) : (
          <Button
            size="small"
            type="primary"
            className={styles.assignBtn}
            onClick={() => onAssignClerk(order)}
          >
            Assign
          </Button>
        ),
    },
  ];

  if (expanded) {
    columns.push({
      title: "eCopy",
      key: "ecopy",
      width: 110,
      render: (_, order) => (
        <Button
          size="small"
          className={styles.uploadBtn}
          icon={<UploadOutlined />}
          onClick={() => onUploadEcopy?.(order)}
        >
          Upload
        </Button>
      ),
    });
  }

  return (
    <div className={styles.tableWrap}>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={orders}
        loading={loading}
        scroll={{ x: 1250 }}
        pagination={{ pageSize: 8, showSizeChanger: false, showQuickJumper: true }}
      />
    </div>
  );
}
