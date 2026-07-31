"use client";

import SimpleListPage from "@/components/layout/SimpleListPage";

interface DistrictRow {
  id: number;
  name: string;
  courts: number;
}

const districts: DistrictRow[] = [
  { id: 1, name: "Thrissur", courts: 6 },
  { id: 2, name: "Ernakulam", courts: 5 },
  { id: 3, name: "Kottayam", courts: 3 },
];

export default function DistrictsPage() {
  return (
    <SimpleListPage
      activeKey="districts"
      title="Certified True Copy"
      count={14}
      subtitle="Districts covered by Court Click"
      data={districts}
      columns={[
        { title: "District", dataIndex: "name" },
        { title: "Courts", dataIndex: "courts" },
      ]}
    />
  );
}
