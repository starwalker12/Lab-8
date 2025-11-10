import Link from 'next/link';

export const metadata = {
  title: 'Number Conversion Guide — Binary, Decimal, Hex & Octal',
  description:
    'Step-by-step student guide to number systems and conversions: binary ↔ decimal, hexadecimal, and octal. Worked examples, tips, shortcuts, and practice suggestions.',
  keywords: ['number conversion', 'binary to decimal', 'hexadecimal', 'octal', 'students', 'computer science'],
};

const ldJson = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Number Conversion Guide — Binary, Decimal, Hex & Octal',
  description:
    'Step-by-step guide with examples for students to convert between binary, decimal, hexadecimal and octal number systems.',
  author: { '@type': 'Person', name: 'SCIT Converter' },
};

export default function NumberConversionGuide() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />

      <h1 className="text-3xl font-bold mb-4">Number Conversion Guide</h1>

      <p className="text-base text-muted-foreground mb-6">
        This guide explains number systems and shows clear, repeatable methods to convert between them.
        It is written with students in mind and includes worked examples and practice tips.
      </p>

      <section className="space-y-6">
        <article>
          <h2 className="text-2xl font-semibold">Understanding bases</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            A number system's base (radix) is the number of distinct digits, including zero, used to
            represent numbers. Decimal is base 10, binary is base 2, octal base 8, and hexadecimal base
            16.
          </p>
        </article>

        <article>
          <h2 className="text-2xl font-semibold">Binary to Decimal</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            To convert a positive binary integer to decimal, multiply each bit by 2 raised to the power of its position and sum:
          </p>
          <pre className="mt-3 rounded bg-muted p-3 text-sm overflow-auto">
{`Binary: 1101
= 1×2³ + 1×2² + 0×2¹ + 1×2⁰
= 8 + 4 + 0 + 1 = 13 (decimal)`}
          </pre>
        </article>

        <article>
          <h2 className="text-2xl font-semibold">Decimal to Binary</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            To convert decimal to binary, repeatedly divide by two and record remainders (LSB first):
          </p>
          <pre className="mt-3 rounded bg-muted p-3 text-sm overflow-auto">
{`Decimal: 13
13 / 2 = 6 rem 1
6 / 2 = 3 rem 0
3 / 2 = 1 rem 1
1 / 2 = 0 rem 1
Read remainders bottom→top: 1101`}
          </pre>
        </article>

        <article>
          <h2 className="text-2xl font-semibold">Hexadecimal & Octal tips</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Hex (base 16) uses digits 0–9 and A–F. A quick trick: group binary digits into 4s for hex and
            into 3s for octal, then convert each group to its value.
          </p>
          <pre className="mt-3 rounded bg-muted p-3 text-sm overflow-auto">
{`Binary: 1110 1011 → Hex: EB
Binary: 111010011 → Octal: 011 101 011 → 353`}
          </pre>
        </article>

        <article>
          <h2 className="text-2xl font-semibold">Decimal to Hexadecimal</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Divide by 16 repeatedly and collect remainders. Use A-F for values 10-15:
          </p>
          <pre className="mt-3 rounded bg-muted p-3 text-sm overflow-auto">
{`Decimal: 255
255 / 16 = 15 rem 15 (F)
15 / 16 = 0 rem 15 (F)
Result: FF`}
          </pre>
        </article>

        <article>
          <h2 className="text-2xl font-semibold">Practice & next steps</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Practice on the interactive converter, try timed drills, and write the conversion steps out by hand
            until they're comfortable. If you're preparing for exams, focus on the common conversions and the
            division/remainder method for decimal→other bases.
          </p>
          <div className="mt-3 flex gap-3">
            <Link href="/" className="inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
              Try the Converter
            </Link>
            <Link href="/resources" className="inline-block rounded-md border border-border px-4 py-2 text-sm hover:bg-accent/5">
              More Resources
            </Link>
          </div>
        </article>

        <article className="text-sm text-muted-foreground border-t border-border pt-4">
          <h3 className="font-semibold text-base">Common pitfalls to avoid</h3>
          <ul className="ml-5 list-disc mt-2 space-y-1">
            <li>Forgetting to pad binary groups when converting to hex/octal</li>
            <li>Mixing up LSB and MSB order when reading remainders</li>
            <li>Neglecting fractional conversion rules (this guide focuses on integers)</li>
            <li>Confusing hex letters: remember A=10, B=11, C=12, D=13, E=14, F=15</li>
          </ul>
        </article>

        <article className="mt-8 rounded-lg border border-border bg-muted/30 p-5">
          <h3 className="font-semibold text-base">Quick Reference Table</h3>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-2 text-left">Decimal</th>
                  <th className="py-2 text-left">Binary</th>
                  <th className="py-2 text-left">Octal</th>
                  <th className="py-2 text-left">Hex</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr><td>0</td><td>0000</td><td>0</td><td>0</td></tr>
                <tr><td>1</td><td>0001</td><td>1</td><td>1</td></tr>
                <tr><td>8</td><td>1000</td><td>10</td><td>8</td></tr>
                <tr><td>10</td><td>1010</td><td>12</td><td>A</td></tr>
                <tr><td>15</td><td>1111</td><td>17</td><td>F</td></tr>
                <tr><td>16</td><td>10000</td><td>20</td><td>10</td></tr>
                <tr><td>255</td><td>11111111</td><td>377</td><td>FF</td></tr>
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </main>
  );
}
