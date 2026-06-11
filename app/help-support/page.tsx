import InfoPage from "@/components/InfoPage";

export default function HelpSupportPage() {
  return (
    <InfoPage
      eyebrow="Customer Care"
      title="Help & Support"
      description="Need help with an order, delivery, customization or product selection? This support page explains how Home Bliss assists customers."
      sections={[
        {
          title: "Order Help",
          text: "Customers can track orders using the Track Order page with their order ID or phone number.",
        },
        {
          title: "Delivery Support",
          text: "Delivery timelines are mentioned on every product page and may vary depending on product type and location.",
        },
        {
          title: "Contact Support",
          text: "Use the Contact page to submit your query. Messages are saved and can be viewed by the admin from the dashboard.",
        },
        {
          title: "Customization",
          text: "For custom furniture requests, customers can use the custom furniture section or contact support.",
        },
      ]}
    />
  );
}