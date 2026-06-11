import type { OrderItem } from "@/types/order";

type OrderItemsListProps = {
  orderId: string;
  items: OrderItem[];
  compact?: boolean;
};

export default function OrderItemsList({
  orderId,
  items,
  compact = false,
}: OrderItemsListProps) {
  return (
    <div className={compact ? "space-y-4" : "space-y-5"}>
      {items.map((item) => (
        <div
          key={`${orderId}-${item.id}`}
          className={`flex items-center gap-5 rounded-[2rem] bg-[#f5f5f7] ${
            compact ? "p-4" : "p-5"
          }`}
        >
          <img
            src={item.image}
            alt={item.name}
            className={`rounded-2xl object-cover ${
              compact ? "h-24 w-24" : "h-28 w-28"
            }`}
          />

          <div className="flex-1">
            <h3 className={compact ? "font-semibold" : "text-2xl font-semibold"}>
              {item.name}
            </h3>

            <p className="mt-2 text-neutral-500">Qty: {item.quantity}</p>

            <p className="mt-2 font-semibold">
              ₹{(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}