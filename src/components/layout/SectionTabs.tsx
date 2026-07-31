"use client";

import { useRouter } from "next/navigation";
import { PlusOutlined } from "@ant-design/icons";
import { Select } from "antd";
import styles from "./SectionTabs.module.css";

export interface TabDef {
  key: string;
  href: string;
  label: string;
  count: number;
  addable?: boolean;
}

export default function SectionTabs({
  tabs,
  active,
  onAdd,
}: {
  tabs: TabDef[];
  active: string;
  onAdd?: (key: string) => void;
}) {
  const router = useRouter();

  return (
    <div className={styles.row}>
      <div className={styles.pillGroup}>
        {tabs.map((tab) => {
          const isActive = tab.key === active;
          return (
            <button
              key={tab.key}
              className={isActive ? `${styles.pill} ${styles.pillActive}` : styles.pill}
              onClick={() => router.push(tab.href)}
            >
              {tab.label} ({tab.count})
              {tab.addable && (
                <span
                  className={styles.addBadge}
                  onClick={(e) => {
                    e.stopPropagation();
                    onAdd?.(tab.key);
                  }}
                  role="button"
                  aria-label={`Add ${tab.label}`}
                >
                  <PlusOutlined style={{ fontSize: 9 }} />
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className={styles.typesSelect}>
        <span className={styles.typesLabel}>Types</span>
        <Select
          defaultValue="ORDERS"
          variant="borderless"
          style={{ width: 110 }}
          options={[
            { value: "ORDERS", label: "ORDERS" },
            { value: "PRODUCTS", label: "PRODUCTS" },
          ]}
        />
      </div>
    </div>
  );
}
