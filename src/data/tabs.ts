import { TabDef } from "@/components/layout/SectionTabs";

export const sectionTabs: TabDef[] = [
  { key: "orders", href: "/orders", label: "Orders", count: 121 },
  { key: "clerks", href: "/clerks", label: "Clerks", count: 40, addable: true },
  { key: "courts", href: "/courts", label: "Courts", count: 32 },
  { key: "districts", href: "/districts", label: "Districts", count: 14 },
  {
    key: "eligible-users",
    href: "/eligible-users",
    label: "Eligible Users",
    count: 11,
  },
];
