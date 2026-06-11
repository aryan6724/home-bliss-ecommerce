import InfoPage from "@/components/InfoPage";

export default function ShowroomPage() {
  return (
    <InfoPage
      eyebrow="Visit Our Space"
      title="Showroom"
      description="Explore the Home Bliss showroom experience where premium furniture collections are displayed for modern living rooms, bedrooms and dining spaces."
      sections={[
        {
          title: "Location",
          text: "Home Bliss Furniture Studio, New Delhi, India.",
        },
        {
          title: "Timings",
          text: "Monday to Saturday, 10 AM to 7 PM.",
        },
        {
          title: "Experience",
          text: "Customers can explore sofa collections, dining furniture, bedroom setups and custom furniture ideas.",
        },
        {
          title: "Consultation",
          text: "Our team can help with product selection, room planning, customization and delivery support.",
        },
      ]}
    />
  );
}