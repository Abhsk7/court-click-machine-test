"use client";

import { useState } from "react";
import { Table, Button, message } from "antd";
import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import DashboardShell from "@/components/layout/DashboardShell";
import PageHeader from "@/components/layout/PageHeader";
import SectionTabs from "@/components/layout/SectionTabs";
import AddClerkModal from "@/components/modals/AddClerkModal";
import { clerks as seedClerks } from "@/data/mockData";
import { sectionTabs } from "@/data/tabs";
import { Clerk } from "@/types";

export default function ClerksPage() {
  const [clerks, setClerks] = useState<Clerk[]>(seedClerks);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = clerks.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.clerkId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardShell>
      <PageHeader
        title="Certified True Copy"
        count={40}
        subtitle="Manage authorized clerks who collect CTC documents"
        search={search}
        onSearchChange={setSearch}
        onFilterClick={() => message.info("Filters coming soon")}
      />
      <SectionTabs tabs={sectionTabs} active="clerks" onAdd={() => setOpen(true)} />

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
        <Button type="primary" shape="round" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
          Add Clerk
        </Button>
      </div>

      <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #efeaee" }}>
        <Table
          rowKey="id"
          dataSource={filtered}
          pagination={{ pageSize: 8, showSizeChanger: false }}
          columns={[
            {
              title: "Clerk",
              key: "clerk",
              render: (_, c) => (
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      background: "#f2eef1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#8a8189",
                    }}
                  >
                    <UserOutlined />
                  </div>
                  <span style={{ fontWeight: 600 }}>{c.name}</span>
                </div>
              ),
            },
            { title: "Clerk ID", dataIndex: "clerkId" },
            { title: "Phone Number", dataIndex: "phone" },
          ]}
        />
      </div>

      <AddClerkModal
        open={open}
        onClose={() => setOpen(false)}
        onSave={(clerk) => {
          setClerks((prev) => [...prev, { ...clerk, id: `c-${Date.now()}` }]);
          message.success("Clerk added");
        }}
      />
    </DashboardShell>
  );
}
