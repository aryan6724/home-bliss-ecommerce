import Link from "next/link";

export default function Footer() {
  return (
    <footer id="about" className="bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-[0.35em]">
              HOME BLISS
            </h2>

            <p className="mt-6 max-w-sm text-sm leading-7 text-white/55">
              Premium furniture crafted for modern homes with timeless design,
              elegant materials and custom-made solutions.
            </p>
          </div>

         <div>
  <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
    Collections
  </h3>

  <div className="mt-6 space-y-3 text-sm">
    <Link
      href="/collections/sofas"
      className="block text-white/50 transition hover:text-white"
    >
      Sofas
    </Link>

    <Link
      href="/collections/dining-sets"
      className="block text-white/50 transition hover:text-white"
    >
      Dining Sets
    </Link>

    <Link
      href="/collections/bedroom"
      className="block text-white/50 transition hover:text-white"
    >
      Bedroom
    </Link>

    <Link
      href="/#custom"
      className="block text-white/50 transition hover:text-white"
    >
      Custom Furniture
    </Link>
  </div>
</div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
              Company
            </h3>

            <div className="mt-6 space-y-3 text-sm">
              <Link
                href="/about"
                className="block text-white/50 transition hover:text-white"
              >
                About Us
              </Link>

              <Link
                href="/contact"
                className="block text-white/50 transition hover:text-white"
              >
                Contact
              </Link>

               <Link
              href="/services"
              className="block text-white/50 transition hover:text-white"
              >
              Services
              </Link>
              
              <Link
                href="/admin-login"
                className="block text-white/50 transition hover:text-white"
              >
                Admin
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
              Support
            </h3>

            <div className="mt-6 space-y-3 text-sm">
              <Link
                href="/track-order"
                className="block text-white/50 transition hover:text-white"
              >
                Track Order
              </Link>

              <Link
                href="/orders"
                className="block text-white/50 transition hover:text-white"
              >
                My Orders
              </Link>

              <Link
                href="/help-support"
                className="block text-white/50 transition hover:text-white"
              >
                Help & Support
              </Link>

              <Link
                href="/warranty"
                className="block text-white/50 transition hover:text-white"
              >
                Warranty
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Home Bliss Furniture. All rights reserved.</p>

          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="transition hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link href="/terms" className="transition hover:text-white">
              Terms
            </Link>

            <Link
              href="/warranty"
                className="block text-white/50 transition hover:text-white"
             >
             Warranty
             </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}