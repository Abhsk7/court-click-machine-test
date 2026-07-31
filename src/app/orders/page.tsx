"use client";

import { useMemo, useState } from "react";
import { message } from "antd";
import DashboardShell from "@/components/layout/DashboardShell";
import PageHeader from "@/components/layout/PageHeader";
import SectionTabs from "@/components/layout/SectionTabs";
import OrdersTable from "@/components/orders/OrdersTable";
import OrderDetailsDrawerModal from "@/components/modals/OrderDetailsDrawerModal";
import OrderDetailsSimpleModal from "@/components/modals/OrderDetailsSimpleModal";
import FilterUsersModal, { FilterValues } from "@/components/modals/FilterUsersModal";
import ChooseTagModal from "@/components/modals/ChooseTagModal";
import CreateTagModal from "@/components/modals/CreateTagModal";
import AssignClerkModal from "@/components/modals/AssignClerkModal";
import AddClerkModal from "@/components/modals/AddClerkModal";
import { orders as seedOrders, clerks as seedClerks, availableTags } from "@/data/mockData";
import { sectionTabs } from "@/data/tabs";
import { Order, OrderStatus, TagInfo } from "@/types";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(seedOrders);
  const [clerks, setClerks] = useState(seedClerks);
  const [tags, setTags] = useState<TagInfo[]>(availableTags);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterValues>({ testUsers: true });

  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [esignOpen, setEsignOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [chooseTagOpen, setChooseTagOpen] = useState(false);
  const [createTagOpen, setCreateTagOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [addClerkOpen, setAddClerkOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        !search ||
        o.applicantName.toLowerCase().includes(search.toLowerCase()) ||
        o.caseNumber.toLowerCase().includes(search.toLowerCase()) ||
        o.courtComplex.toLowerCase().includes(search.toLowerCase());
      const matchesDistrict = !filters.district || o.district === filters.district;
      const matchesCourt =
        !filters.courtEstablishment || o.courtComplex === filters.courtEstablishment;
      const matchesProduct =
        !filters.product || filters.product === "all" || o.productType === filters.product;
      return matchesSearch && matchesDistrict && matchesCourt && matchesProduct;
    });
  }, [orders, search, filters]);

  const updateOrder = (id: number, patch: Partial<Order>) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, ...patch } : o)));
  };

  return (
    <DashboardShell>
      <PageHeader
        title="Certified True Copy"
        count={47834}
        subtitle="Manage Your CTC Orders Here"
        search={search}
        onSearchChange={setSearch}
        onFilterClick={() => setFilterOpen(true)}
        onShareClick={() => message.info("Share link copied")}
      />

      <SectionTabs tabs={sectionTabs} active="orders" onAdd={() => setAddClerkOpen(true)} />

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
        <button
          onClick={() => setExpanded((v) => !v)}
          style={{
            border: "1px solid #e7e2e6",
            background: expanded ? "#17121a" : "#fff",
            color: expanded ? "#fff" : "#4a4249",
            borderRadius: 20,
            padding: "6px 14px",
            fontSize: 12,
            cursor: "pointer",
          }}
        >
          {expanded ? "Collapse" : "Expanded"} view
        </button>
      </div>

      <OrdersTable
        orders={filteredOrders}
        expanded={expanded}
        onUploadEcopy={(order) => message.info(`Upload eCopy for order #${order.orderId}`)}
        onView={(order) => {
          setActiveOrder(order);
          setDetailsOpen(true);
        }}
        onEsign={(order) => {
          setActiveOrder(order);
          setEsignOpen(true);
        }}
        onChooseTag={(order) => {
          setActiveOrder(order);
          setChooseTagOpen(true);
        }}
        onAssignClerk={(order) => {
          setActiveOrder(order);
          setAssignOpen(true);
        }}
        onEditClerk={(order) => {
          setActiveOrder(order);
          setAssignOpen(true);
        }}
        onRemoveTag={(order, tagId) => {
          updateOrder(order.id, { tags: order.tags.filter((t) => t.id !== tagId) });
        }}
        onStatusChange={(order, status: OrderStatus) => {
          updateOrder(order.id, { status });
          message.success(`Status updated to "${status}"`);
        }}
      />

      {/* Detailed order (View button) */}
      <OrderDetailsDrawerModal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        order={activeOrder}
      />

      {/* E-sign / order summary */}
      <OrderDetailsSimpleModal
        open={esignOpen}
        onClose={() => setEsignOpen(false)}
        order={activeOrder}
      />

      <FilterUsersModal
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        value={filters}
        onApply={setFilters}
      />

      <ChooseTagModal
        open={chooseTagOpen}
        onClose={() => setChooseTagOpen(false)}
        tags={tags}
        onSelect={(tag) => {
          if (activeOrder && !activeOrder.tags.find((t) => t.id === tag.id)) {
            updateOrder(activeOrder.id, { tags: [...activeOrder.tags, tag] });
          }
          setChooseTagOpen(false);
        }}
        onCreateNew={() => {
          setChooseTagOpen(false);
          setCreateTagOpen(true);
        }}
        onEdit={() => message.info("Tag editing coming soon")}
        onDelete={(tag) => setTags((prev) => prev.filter((t) => t.id !== tag.id))}
      />

      <CreateTagModal
        open={createTagOpen}
        onClose={() => setCreateTagOpen(false)}
        onCreate={(name, color) => {
          const colorKeyMap: Record<string, TagInfo["color"]> = {
            "#5c7a8c": "steel",
            "#7a9b7e": "green",
            "#c17a5e": "terracotta",
            "#8a7a6a": "brown",
            "#b89530": "gold",
            "#8d7ab5": "purple",
            "#5c7a99": "blue",
            "#c17a86": "rose",
            "#9a9a9a": "grey",
            "#5e9b8e": "teal",
            "#3d1530": "plum",
          };
          const newTag: TagInfo = {
            id: `t-${Date.now()}`,
            label: name,
            color: colorKeyMap[color] ?? "grey",
          };
          setTags((prev) => [...prev, newTag]);
          if (activeOrder) {
            updateOrder(activeOrder.id, { tags: [...activeOrder.tags, newTag] });
          }
          message.success("Tag created");
        }}
      />

      <AssignClerkModal
        open={assignOpen}
        onClose={() => setAssignOpen(false)}
        clerks={clerks}
        onAssign={(clerk) => {
          if (activeOrder) updateOrder(activeOrder.id, { clerk });
          message.success(`${clerk.name} assigned`);
        }}
        onAddNew={() => {
          setAssignOpen(false);
          setAddClerkOpen(true);
        }}
      />

      <AddClerkModal
        open={addClerkOpen}
        onClose={() => setAddClerkOpen(false)}
        onSave={(clerk) => {
          setClerks((prev) => [...prev, { ...clerk, id: `c-${Date.now()}` }]);
          message.success("Clerk added");
        }}
      />
    </DashboardShell>
  );
}
