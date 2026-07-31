"use client";

import { useState } from "react";
import { Table, Empty } from "antd";
import DashboardShell from "./DashboardShell";
import PageHeader from "./PageHeader";
import SectionTabs from "./SectionTabs";
import { sectionTabs } from "@/data/tabs";
import type { ColumnsType } from "antd/es/table";

export default function SimpleListPage<T extends { id: string | number }>({
  activeKey,
  title,
  subtitle,
  count,
  data,
  columns,
}: {
  activeKey: string;
  title: string;
  subtitle: string;
  count: number;
  data: T[];
  columns: ColumnsType<T>;
}) {
  const [search, setSearch] = useState("");

  return (
    <DashboardShell>
      <PageHeader
        title={title}
        count={count}
        subtitle={subtitle}
        search={search}
        onSearchChange={setSearch}
        onFilterClick={() => {}}
      />
      <SectionTabs tabs={sectionTabs} active={activeKey} />
      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #efeaee" }}>
        {data.length ? (
          <Table
            rowKey="id"
            dataSource={data}
            columns={columns}
            pagination={{ pageSize: 8, showSizeChanger: false }}
          />
        ) : (
          <div style={{ padding: "60px 0" }}>
            <Empty description="Nothing to show yet" />
          </div>
        )}
      </div>
    </DashboardShell>
  );
}
