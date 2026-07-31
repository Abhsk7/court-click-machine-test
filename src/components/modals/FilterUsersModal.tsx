"use client";

import { Modal, Select, Checkbox, Button, Form } from "antd";

export interface FilterValues {
  district?: string;
  courtEstablishment?: string;
  product?: string;
  testUsers: boolean;
}

const DISTRICTS = ["Thrissur", "Ernakulam", "Kochi", "Kottayam", "Alappuzha"];
const COURTS = [
  "Court Complex, Kunnamkullam",
  "District Court Thrissur",
  "District Court Ernakulam",
];

export default function FilterUsersModal({
  open,
  onClose,
  value,
  onApply,
}: {
  open: boolean;
  onClose: () => void;
  value: FilterValues;
  onApply: (v: FilterValues) => void;
}) {
  const [form] = Form.useForm<FilterValues>();

  const handleReset = () => {
    form.setFieldsValue({
      district: undefined,
      courtEstablishment: undefined,
      product: undefined,
      testUsers: true,
    });
  };

  const handleApply = () => {
    onApply(form.getFieldsValue());
    onClose();
  };

  return (
    <Modal open={open} onCancel={onClose} title="Filter Users" footer={null} width={480}>
      <Form form={form} layout="vertical" initialValues={value}>
        <Form.Item label="District" name="district">
          <Select
            allowClear
            placeholder="Choose District"
            options={DISTRICTS.map((d) => ({ value: d, label: d }))}
          />
        </Form.Item>
        <Form.Item label="Court Establishment" name="courtEstablishment">
          <Select
            allowClear
            placeholder="Choose Court Establishment"
            options={COURTS.map((c) => ({ value: c, label: c }))}
          />
        </Form.Item>
        <Form.Item label="Product" name="product">
          <Select
            placeholder="All"
            options={[
              { value: "all", label: "All" },
              { value: "Judgement", label: "Judgement" },
              { value: "Interim Order", label: "Interim Order" },
              { value: "Other", label: "Other" },
            ]}
          />
        </Form.Item>
        <Form.Item name="testUsers" valuePropName="checked">
          <Checkbox>Test Users</Checkbox>
        </Form.Item>
      </Form>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 16 }}>
        <Button shape="round" onClick={handleReset}>
          Reset Filter
        </Button>
        <Button type="primary" shape="round" onClick={handleApply}>
          Apply Filter
        </Button>
      </div>
    </Modal>
  );
}
