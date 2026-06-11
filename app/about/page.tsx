import InfoPage from "@/components/InfoPage";

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="About Home Bliss"
      title="About Us"
      description="Home Bliss is a premium furniture ecommerce concept focused on modern homes, elegant interiors and high-quality furniture experiences."
      sections={[
        {
          title: "Our Vision",
          text: "We aim to make premium furniture accessible through a clean digital shopping experience with product discovery, wishlist, cart, checkout and order tracking.",
        },
        {
          title: "Our Products",
          text: "Our collection includes sofas, dining sets, beds, wardrobes, study tables, TV units and custom-made furniture for modern homes.",
        },
        {
          title: "Quality Focus",
          text: "Each product is presented with material details, delivery information, pricing and a premium visual experience.",
        },
        {
          title: "Demo Project Note",
          text: "This is a frontend ecommerce project with localStorage-based cart, orders, wishlist and admin dashboard. Database integration can be added later.",
        },
      ]}
    />
  );
}