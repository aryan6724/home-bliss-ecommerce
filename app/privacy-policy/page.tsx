import InfoPage from "@/components/InfoPage";

export default function PrivacyPolicyPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Privacy Policy"
      description="This privacy policy explains how customer information is handled in the Home Bliss demo ecommerce project."
      sections={[
        {
          title: "Information Collected",
          text: "The project stores cart items, wishlist items, orders and contact messages locally in the browser using localStorage.",
        },
        {
          title: "Usage",
          text: "Stored data is used only to demonstrate ecommerce features such as checkout, order history, tracking and admin support.",
        },
        {
          title: "Data Storage",
          text: "No real backend database is currently connected. Data remains in the user's browser unless cleared.",
        },
        {
          title: "Future Scope",
          text: "In a production version, MongoDB authentication, secure APIs and proper privacy controls should be added.",
        },
      ]}
    />
  );
}