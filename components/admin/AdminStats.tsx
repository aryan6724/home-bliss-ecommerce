import type { AdminOrder } from "@/types/adminOrder";

type AdminStatsProps = {
  orders: AdminOrder[];
};

export default function AdminStats({ orders }: AdminStatsProps) {
  const totalRevenue = orders.reduce((total, order) => total + order.total, 0);

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending Confirmation"
  ).length;

  const confirmedOrders = orders.filter(
    (order) => order.status === "Confirmed"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled"
  ).length;

  const stats = [
    {
      label: "Total Orders",
      value: orders.length.toString(),
      helper: "All customer orders",
    },
    {
      label: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      helper: "Total order value",
    },
    {
      label: "Pending",
      value: pendingOrders.toString(),
      helper: "Waiting confirmation",
    },
    {
      label: "Confirmed",
      value: confirmedOrders.toString(),
      helper: "Accepted orders",
    },
    {
      label: "Delivered",
      value: deliveredOrders.toString(),
      helper: "Completed orders",
    },
    {
      label: "Cancelled",
      value: cancelledOrders.toString(),
      helper: "Cancelled orders",
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="min-w-0 rounded-[2rem] bg-white p-6 shadow-sm"
        >
          <p className="text-sm font-medium text-neutral-500">{stat.label}</p>

          <h2 className="mt-3 break-words text-3xl font-semibold leading-tight tracking-tight text-black lg:text-4xl">
            {stat.value}
          </h2>

          <p className="mt-3 text-sm text-neutral-400">{stat.helper}</p>
        </div>
      ))}
    </div>
  );
}