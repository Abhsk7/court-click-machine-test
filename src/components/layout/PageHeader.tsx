"use client";

import { Input, Tooltip } from "antd";
import {
  ShareAltOutlined,
  SlidersOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import styles from "./PageHeader.module.css";

export default function PageHeader({
  title,
  count,
  subtitle,
  search,
  onSearchChange,
  onFilterClick,
  onShareClick,
}: {
  title: string;
  count: number;
  subtitle: string;
  search: string;
  onSearchChange: (v: string) => void;
  onFilterClick: () => void;
  onShareClick?: () => void;
}) {
  return (
    <div className={styles.header}>
      <div>
        <h1 className={styles.title}>
          {title} <span className={styles.count}>({count})</span>
        </h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      <div className={styles.actions}>
        <Tooltip title="Share">
          <button className={styles.iconBtn} onClick={onShareClick} aria-label="Share">
            <ShareAltOutlined />
          </button>
        </Tooltip>
        <Tooltip title="Filters">
          <button className={styles.iconBtn} onClick={onFilterClick} aria-label="Filters">
            <SlidersOutlined />
          </button>
        </Tooltip>
        <Input
          className={styles.search}
          placeholder="Search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          prefix={<SearchOutlined style={{ color: "#b7aeb6" }} />}
        />
      </div>
    </div>
  );
}
