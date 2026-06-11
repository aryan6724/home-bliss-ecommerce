import type { AdminOrder } from "@/types/adminOrder";

type AdminOrderCardProps = {
  order: AdminOrder;
  updatingOrderId: string;
  onStatusChange: (orderId: string, newStatus: string) => void;
};

const orderStatuses = [
  "Pending Confirmation",
  "Confirmed",
  "Processing",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

function getStatusStyle(status: string) {
  if (status === "Delivered") {
    return "bg-green-100 text-green-700";
  }

  if (status === "Cancelled") {
    return "bg-red-100 text-red-700";
  }

  if (status === "Out for Delivery") {
    return "bg-blue-100 text-blue-700";
  }

  if (status === "Processing") {
    return "bg-purple-100 text-purple-700";
  }

  if (status === "Confirmed") {
    return "bg-yellow-100 text-yellow-700";
  }

  return "bg-neutral-200 text-neutral-700";
}

export default function AdminOrderCard({
  order,
  updatingOrderId,
  onStatusChange,
}: AdminOrderCardProps) {
  const isUpdating = updatingOrderId === order.orderId;

  return (
    <div className="rounded-[2rem] border border-neutral-200 bg-white p-6 transition hover:border-neutral-300 hover:shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <div>
              <p className="text-sm text-neutral-500">Order ID</p>

              <h3 className="mt-1 text-2xl font-semibold">
                {order.orderId}
              </h3>
            </div>

            <span
              className={`rounded-full px-4 py-2 text-xs font-semibold ${getStatusStyle(
                order.status
              )}`}
            >
              {order.status}
            </span>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.5rem] bg-[#f5f5f7] p-5">
              <p className="text-sm font-semibold text-black">
                Customer Details
              </p>

              <div className="mt-3 space-y-2 text-sm text-neutral-600">
                <p>
                  Name:{" "}
                  <span className="font-semibold text-black">
                    {order.customer.name}
                  </span>
                </p>

                <p>
                  Email:{" "}
                  <span className="font-semibold text-black">
                    {order.customer.email}
                  </span>
                </p>

                <p>
                  Phone:{" "}
                  <span className="font-semibold text-black">
                    {order.customer.phone}
                  </span>
                </p>

                <p>
                  City:{" "}
                  <span className="font-semibold text-black">
                    {order.customer.city}
                  </span>
                </p>

                <p>
                  Pincode:{" "}
                  <span className="font-semibold text-black">
                    {order.customer.pincode}
                  </span>
                </p>
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-[#f5f5f7] p-5">
              <p className="text-sm font-semibold text-black">
                Order Details
              </p>

              <div className="mt-3 space-y-2 text-sm text-neutral-600">
                <p>
                  Date:{" "}
                  <span className="font-semibold text-black">
                    {order.date}
                  </span>
                </p>

                <p>
                  Payment:{" "}
                  <span className="font-semibold text-black">
                    {order.customer.paymentMethod}
                  </span>
                </p>

                <p>
                  Total Items:{" "}
                  <span className="font-semibold text-black">
                    {order.items.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </span>
                </p>

                <p>
                  Total Amount:{" "}
                  <span className="font-semibold text-black">
                    ₹{order.total.toLocaleString()}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-[1.5rem] bg-[#f5f5f7] p-5">
            <p className="text-sm font-semibold text-black">
              Delivery Address
            </p>

            <p className="mt-2 text-sm leading-6 text-neutral-600">
              {order.customer.address}
            </p>
          </div>
        </div>

        <div className="w-full rounded-[1.5rem] bg-[#f5f5f7] p-5 lg:w-[280px]">
          <p className="text-sm text-neutral-500">Total Amount</p>

          <h4 className="mt-2 text-3xl font-semibold">
            ₹{order.total.toLocaleString()}
          </h4>

          <label className="mt-6 block text-sm font-semibold text-neutral-700">
            Update Order Status
          </label>

          <select
            value={order.status}
            disabled={isUpdating}
            onChange={(e) => onStatusChange(order.orderId, e.target.value)}
            className="mt-3 w-full rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold outline-none transition focus:border-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {orderStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          {isUpdating ? (
            <p className="mt-3 rounded-full bg-white px-4 py-2 text-center text-xs font-semibold text-neutral-500">
              Updating status...
            </p>
          ) : (
            <p className="mt-3 text-xs leading-5 text-neutral-500">
              Customer will see this updated status on the track order page.
            </p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <p className="mb-4 text-sm font-semibold text-black">
          Ordered Products
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {order.items.map((item) => (
            <div
              key={`${order.orderId}-${item.id}`}
              className="flex items-center gap-4 rounded-[1.5rem] bg-[#f5f5f7] p-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-20 rounded-2xl object-cover"
              />

              <div className="min-w-0">
                <h4 className="line-clamp-1 font-semibold">{item.name}</h4>

                <p className="mt-1 text-sm text-neutral-500">
                  Qty: {item.quantity} × ₹{item.price.toLocaleString()}
                </p>

                <p className="mt-1 text-sm font-semibold">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}