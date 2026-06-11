import Link from "next/link";

type InfoSection = {
  title: string;
  text: string;
};

type InfoPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  sections: InfoSection[];
};

export default function InfoPage({
  eyebrow,
  title,
  description,
  sections,
}: InfoPageProps) {
  return (
    <main className="min-h-screen bg-[#f5f5f7] px-6 py-24 text-black">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.5em] text-neutral-500">
              {eyebrow}
            </p>

            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
              {title}
            </h1>
          </div>

          <Link
            href="/"
            className="w-fit rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="rounded-[3rem] bg-white p-8 shadow-sm md:p-12">
          <p className="max-w-4xl text-xl leading-9 text-neutral-600">
            {description}
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {sections.map((section) => (
              <div
                key={section.title}
                className="rounded-[2rem] bg-[#f5f5f7] p-7"
              >
                <h2 className="text-2xl font-semibold">{section.title}</h2>

                <p className="mt-4 leading-7 text-neutral-600">
                  {section.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}