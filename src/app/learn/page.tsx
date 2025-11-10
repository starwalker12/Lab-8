import Link from 'next/link';

export const metadata = {
  title: 'Learn Number Conversions — Number Converter',
  description:
    'Clear, student-friendly explanations of number systems and conversion techniques (binary, decimal, octal, hex). Examples, tips, and links to tools for fast practice.',
};

export default function LearnIndex() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">Learn: Number Systems & Conversions</h1>

      <p className="text-base text-muted-foreground mb-6">
        This section is designed for students who want to understand and master number conversions between
        binary, decimal, octal and hexadecimal. Read the guide, follow examples, then try the interactive
        converter tools in the app.
      </p>

      <section className="space-y-4">
        <article className="rounded-lg border border-border p-5">
          <h2 className="text-xl font-semibold">Getting started</h2>
          <p className="text-sm text-muted-foreground mt-2">Key concepts you should know:</p>
          <ul className="mt-2 ml-5 list-disc text-sm text-muted-foreground">
            <li>Place value and positional notation</li>
            <li>Base/radix of a number system</li>
            <li>How to convert step-by-step between bases</li>
          </ul>
        </article>

        <article className="rounded-lg border border-border p-5">
          <h2 className="text-xl font-semibold">Start with the deep-dive</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Read the in-depth guide on number conversions for clear explanations and worked examples.
          </p>
          <div className="mt-3">
            <Link
              href="/learn/number-conversion"
              className="inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-95"
            >
              Read the Guide →
            </Link>
          </div>
        </article>

        <article className="rounded-lg border border-border p-5">
          <h2 className="text-xl font-semibold">Practice tools</h2>
          <p className="mt-2 text-sm text-muted-foreground">Try conversions interactively:</p>
          <div className="mt-3 flex gap-3">
            <Link
              href="/"
              className="inline-block rounded-md border border-border px-4 py-2 text-sm hover:bg-accent/5"
            >
              Open Converter
            </Link>
            <Link
              href="/resources"
              className="inline-block rounded-md border border-border px-4 py-2 text-sm hover:bg-accent/5"
            >
              Resources
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
