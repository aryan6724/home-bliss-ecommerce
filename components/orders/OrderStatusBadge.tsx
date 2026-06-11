type OrderStatusBadgeProps = {
  status: string;
};

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const statusClass =
    status === "Delivered"
      ? "bg-green-100 text-green-700"
      : status === "Cancelled"
      ? "bg-red-100 text-red-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <span
      className={`w-fit rounded-full px-5 py-2 text-sm font-semibold ${statusClass}`}
    >
      {status}
    </span>
  );
}