import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import StatusBadge from "@/components/ui/StatusBadge";
import TagChip from "@/components/ui/TagChip";

describe("StatusBadge", () => {
  it("renders the status label", () => {
    render(<StatusBadge status="order placed" />);
    expect(screen.getByText("order placed")).toBeInTheDocument();
  });

  it("renders cancelled status", () => {
    render(<StatusBadge status="cancelled" />);
    expect(screen.getByText("cancelled")).toBeInTheDocument();
  });
});

describe("TagChip", () => {
  it("renders the tag label", () => {
    render(<TagChip tag={{ id: "1", label: "Aadhaar Verified", color: "gold" }} />);
    expect(screen.getByText("Aadhaar Verified")).toBeInTheDocument();
  });

  it("calls onRemove with the tag id when the remove button is clicked", () => {
    const onRemove = vi.fn();
    render(
      <TagChip tag={{ id: "42", label: "Add Case", color: "brown" }} onRemove={onRemove} />
    );
    fireEvent.click(screen.getByLabelText("Remove Add Case"));
    expect(onRemove).toHaveBeenCalledWith("42");
  });
});
