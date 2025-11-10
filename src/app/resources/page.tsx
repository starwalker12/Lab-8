import Link from 'next/link';
import { BookOpen, Calculator, GraduationCap, ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'Number Conversion Resources & References',
  description:
    'Helpful resources for learning number systems: practice problems, tutorials, cheat sheets, and recommended tools for students studying computer science and digital logic.',
};

export default function ResourcesPage() {
  return (
    <main className="container mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-bold mb-4">Resources & References</h1>

      <p className="text-base text-muted-foreground mb-8">
        Additional materials and links to help you master number conversions and understand how computers
        represent and process numbers.
      </p>

      <section className="space-y-6">
        <article className="rounded-lg border border-border p-6">
          <div className="flex items-start gap-3">
            <BookOpen className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold">Learning Materials</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Start with our in-house guide, then explore external tutorials for deeper understanding.
              </p>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/learn/number-conversion" className="text-sm text-primary hover:underline">
                    → Our Number Conversion Guide
                  </Link>
                </li>
                <li className="text-sm text-muted-foreground">
                  → Khan Academy: Computer Science (external)
                </li>
                <li className="text-sm text-muted-foreground">
                  → CS50 Lecture: Binary & Hexadecimal (external)
                </li>
              </ul>
            </div>
          </div>
        </article>

        <article className="rounded-lg border border-border p-6">
          <div className="flex items-start gap-3">
            <Calculator className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold">Practice Tools</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Interactive converters and exercises to sharpen your skills.
              </p>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/" className="text-sm text-primary hover:underline">
                    → SCIT Number Converter (This App)
                  </Link>
                </li>
                <li className="text-sm text-muted-foreground">
                  → RapidTables Number Conversion (external)
                </li>
                <li className="text-sm text-muted-foreground">
                  → Binary Game - Practice binary counting (external)
                </li>
              </ul>
            </div>
          </div>
        </article>

        <article className="rounded-lg border border-border p-6">
          <div className="flex items-start gap-3">
            <GraduationCap className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h2 className="text-xl font-semibold">For Students & Exam Prep</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Tips and references for computer science courses and standardized tests.
              </p>
              <div className="mt-3 space-y-3">
                <div className="text-sm">
                  <p className="font-medium">Common exam topics:</p>
                  <ul className="ml-5 list-disc text-muted-foreground mt-1">
                    <li>Binary arithmetic (addition, subtraction, two's complement)</li>
                    <li>Hexadecimal memory addresses</li>
                    <li>Octal file permissions (Unix/Linux)</li>
                    <li>IEEE 754 floating point representation</li>
                  </ul>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Study strategies:</p>
                  <ul className="ml-5 list-disc text-muted-foreground mt-1">
                    <li>Practice daily conversions (5-10 problems)</li>
                    <li>Create flashcards for common conversions (powers of 2, hex values)</li>
                    <li>Time yourself to build speed</li>
                    <li>Work through problems without a calculator first</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article className="rounded-lg border border-border bg-muted/30 p-6">
          <h2 className="text-xl font-semibold mb-3">Cheat Sheets</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium">Powers of 2 (memorize these!)</h3>
              <div className="mt-2 text-xs text-muted-foreground font-mono grid grid-cols-2 gap-x-4 gap-y-1">
                <span>2⁰ = 1</span>
                <span>2⁸ = 256</span>
                <span>2¹ = 2</span>
                <span>2⁹ = 512</span>
                <span>2² = 4</span>
                <span>2¹⁰ = 1024 (1K)</span>
                <span>2³ = 8</span>
                <span>2¹⁶ = 65,536 (64K)</span>
                <span>2⁴ = 16</span>
                <span>2²⁰ = 1,048,576 (1M)</span>
                <span>2⁵ = 32</span>
                <span>2³² = 4,294,967,296 (4G)</span>
                <span>2⁶ = 64</span>
                <span>2⁶⁴ = 18,446,744,073,709,551,616</span>
                <span>2⁷ = 128</span>
                <span></span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium">Hex digits quick reference</h3>
              <div className="mt-2 text-xs text-muted-foreground font-mono">
                A=10, B=11, C=12, D=13, E=14, F=15
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium">Binary grouping</h3>
              <div className="mt-2 text-xs text-muted-foreground">
                <p>→ 4 bits = 1 hex digit (nibble)</p>
                <p>→ 3 bits = 1 octal digit</p>
                <p>→ 8 bits = 1 byte = 2 hex digits</p>
              </div>
            </div>
          </div>
        </article>

        <article className="rounded-lg border border-border p-6">
          <h2 className="text-xl font-semibold mb-2">Additional Topics</h2>
          <p className="text-sm text-muted-foreground mb-3">
            Once you master basic conversions, explore these advanced topics:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Signed numbers: Sign-magnitude, one's complement, two's complement</li>
            <li>• Fixed-point and floating-point representation</li>
            <li>• ASCII, Unicode, and character encoding</li>
            <li>• Bitwise operations (AND, OR, XOR, shift)</li>
            <li>• Endianness (big-endian vs little-endian)</li>
          </ul>
        </article>

        <div className="pt-6 text-center">
          <Link
            href="/learn"
            className="inline-block rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Back to Learning Hub
          </Link>
        </div>
      </section>
    </main>
  );
}
