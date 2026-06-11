import InfoPage from "@/components/InfoPage";

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Terms & Conditions"
      description="These terms explain the basic usage rules for the Home Bliss demo ecommerce website."
      sections={[
        {
          title: "Demo Website",
          text: "Home Bliss is currently a portfolio/demo ecommerce project and not a real commercial store.",
        },
        {
          title: "Orders",
          text: "Orders placed on the website are saved locally for demonstration purposes only.",
        },
        {
          title: "Payments",
          text: "Real payment gateway integration is not enabled. Checkout is currently a demo flow.",
        },
        {
          title: "Future Production Use",
          text: "Before real business use, backend database, authentication, payment gateway and legal policies must be implemented properly.",
        },
      ]}
    />
  );
}