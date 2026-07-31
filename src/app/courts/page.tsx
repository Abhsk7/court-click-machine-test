"use client";

import SimpleListPage from "@/components/layout/SimpleListPage";

interface CourtRow {
  id: number;
  name: string;
  district: string;
  activeOrders: number;
}

const courts: CourtRow[] = [
  { id: 1, name: "Court Complex, Kunnamkullam", district: "Thrissur", activeOrders: 14 },
  { id: 2, name: "District Court Thrissur", district: "Thrissur", activeOrders: 22 },
  { id: 3, name: "District Court Ernakulam", district: "Ernakulam", activeOrders: 9 },
];

export default function CourtsPage() {
  return (
    <SimpleListPage
      activeKey="courts"
      title="Certified True Copy"
      count={32}
      subtitle="Courts registered on Court Click"
      data={courts}
      columns={[
        { title: "Court Complex", dataIndex: "name" },
        { title: "District", dataIndex: "district" },
        { title: "Active Orders", dataIndex: "activeOrders" },
      ]}
    />
  );
}
