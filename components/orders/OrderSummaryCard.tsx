import type { PublicOrder } from "@/types/order";

type OrderSummaryCardProps = {
  order: PublicOrder;
  showDate?: boolean;
};

export default function OrderSummaryCard({
  order,
  showDate = true,
}: OrderSummaryCardProps) {
  return (
    <aside className="h-fit rounded-[2rem] bg-black p-7 text-white">
      <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/50">
        Order Summary
      </p>

      <div className="mt-6 space-y-4 text-sm">
        <p>
          <span className="text-white/50">Customer:</span>{" "}
          {order.customer.name}
        </p>

        <p>
          <span className="text-white/50">Phone:</span>{" "}
          {order.customer.phone}
        </p>

        <p>
          <span className="text-white/50">City:</span>{" "}
          {order.customer.city}
        </p>

        {showDate && (
          <p>
            <span className="text-white/50">Date:</span> {order.date}
          </p>
        )}

        <p>
          <span className="text-white/50">Payment:</span>{" "}
          {order.customer.paymentMethod}
        </p>
      </div>

      <div className="mt-8 flex justify-between border-t border-white/10 pt-6 text-2xl font-semibold">
        <span>Total</span>
        <span>₹{order.total.toLocaleString()}</span>
      </div>
    </aside>
  );
}