"use client";

import SimpleListPage from "@/components/layout/SimpleListPage";

interface EligibleUserRow {
  id: number;
  name: string;
  phone: string;
  verified: string;
}

const users: EligibleUserRow[] = [
  { id: 1, name: "Laisamma George", phone: "919876543210", verified: "Yes" },
  { id: 2, name: "Soji Abraham", phone: "918086165790", verified: "Yes" },
  { id: 3, name: "Anil Philip", phone: "919495862301", verified: "No" },
];

export default function EligibleUsersPage() {
  return (
    <SimpleListPage
      activeKey="eligible-users"
      title="Certified True Copy"
      count={11}
      subtitle="Users eligible to place CTC orders"
      data={users}
      columns={[
        { title: "Name", dataIndex: "name" },
        { title: "Phone", dataIndex: "phone" },
        { title: "Aadhaar Verified", dataIndex: "verified" },
      ]}
    />
  );
}
