"use client";

import { useState, useMemo } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ClipboardCopy, Check, AlertTriangle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

type Base = 'bin' | 'dec' | 'oct' | 'hex';
type NumberValues = Record<Base, string>;

const baseDetails: Record<Base, { label: string; base: number; regex: RegExp }> = {
  dec: { label: 'Decimal', base: 10, regex: /^\d+$/ },
  bin: { label: 'Binary', base: 2, regex: /^[01]+$/ },
  oct: { label: 'Octal', base: 8, regex: /^[0-7]+$/ },
  hex: { label: 'Hexadecimal', base: 16, regex: /^[0-9a-fA-F]+$/ },
};

const getExplanation = (fromBase: Base, toBase: Base, value: string, result: string): React.ReactNode => {
    const fromDetails = baseDetails[fromBase];
    const toDetails = baseDetails[toBase];

    if (fromBase === 'dec') {
        const num = BigInt(value);
        let tempNum = num;
        const steps: string[] = [];
        while (tempNum > 0) {
            const remainder = tempNum % BigInt(toDetails.base);
            steps.push(`${tempNum} ÷ ${toDetails.base} = ${tempNum / BigInt(toDetails.base)} R ${remainder.toString(toDetails.base).toUpperCase()}`);
            tempNum /= BigInt(toDetails.base);
        }
        return (
            <div>
                <p>To convert a decimal number to {toDetails.label.toLowerCase()}, repeatedly divide the number by {toDetails.base} and record the remainders. The {toDetails.label.toLowerCase()} number is the sequence of remainders read from bottom to top.</p>
                <pre className="mt-2 p-2 bg-muted rounded-md text-sm">
                    {steps.join('\n') || `0 ÷ ${toDetails.base} = 0 R 0`}
                </pre>
                <p className="mt-2">Reading remainders upwards: <strong>{result.toUpperCase()}</strong></p>
            </div>
        );
    }

    // From other bases to decimal
    const digits = value.split('').reverse();
    const calculation = digits.map((digit, i) => {
        const digitValue = parseInt(digit, fromDetails.base);
        return `${digitValue} × ${fromDetails.base}<sup>${i}</sup>`;
    }).reverse().join(' + ');

    const sum = digits.reduce((acc, digit, i) => {
        return acc + BigInt(parseInt(digit, fromDetails.base)) * (BigInt(fromDetails.base) ** BigInt(i));
    }, BigInt(0));

    return (
        <div>
            <p>To convert from {fromDetails.label.toLowerCase()} to decimal, multiply each digit by its positional value ({fromDetails.base} to the power of its position) and sum the results.</p>
            <pre className="mt-2 p-2 bg-muted rounded-md text-sm" dangerouslySetInnerHTML={{ __html: `${value}<sub>${fromDetails.base}</sub> = ${calculation} = ${sum.toString()}` }}></pre>
        </div>
    );
};

export function Converter() {
  const [values, setValues] = useState<NumberValues>({ dec: '', bin: '', oct: '', hex: '' });
  const [error, setError] = useState<string | null>(null);
  const [copiedBase, setCopiedBase] = useState<Base | null>(null);
  const [lastEdited, setLastEdited] = useState<Base>('dec');
  const { toast } = useToast();

  const handleCopy = (base: Base) => {
    if (!values[base]) return;
    navigator.clipboard.writeText(values[base]);
    setCopiedBase(base);
    toast({
      title: 'Copied to Clipboard',
      description: `${baseDetails[base].label} value: ${values[base]}`,
    });
    setTimeout(() => setCopiedBase(null), 2000);
  };

  const handleChange = (base: Base, value: string) => {
    setLastEdited(base);
    if (value === '') {
      setValues({ dec: '', bin: '', oct: '', hex: '' });
      setError(null);
      return;
    }

    if (!baseDetails[base].regex.test(value)) {
      const updatedValues = { dec: '', bin: '', oct: '', hex: '', [base]: value };
      setValues(updatedValues);
      setError(`Invalid character for ${baseDetails[base].label} input.`);
      return;
    }

    setError(null);

    try {
      const bigIntValue = BigInt(
        { dec: '', bin: '0b', oct: '0o', hex: '0x' }[base] + value
      );

      setValues({
        dec: bigIntValue.toString(10),
        bin: bigIntValue.toString(2),
        oct: bigIntValue.toString(8),
        hex: bigIntValue.toString(16).toUpperCase(),
      });
    } catch (e) {
      setError("Number is too large or invalid.");
      setValues({ dec: '', bin: '', oct: '', hex: '', [base]: value });
    }
  };

  const conversionExplanations = useMemo(() => {
    if (!values.dec || error) return null;

    const otherBases = (Object.keys(baseDetails) as Base[]).filter(b => b !== lastEdited);

    return (
        <Accordion type="single" collapsible className="w-full mt-4">
            {otherBases.map((targetBase) => (
                <AccordionItem value={targetBase} key={targetBase}>
                    <AccordionTrigger>
                        How to convert from {baseDetails[lastEdited].label} to {baseDetails[targetBase].label}
                    </AccordionTrigger>
                    <AccordionContent>
                        {getExplanation(lastEdited, targetBase, values[lastEdited], values[targetBase])}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}, [values, lastEdited, error]);


  return (
    <div className="w-full max-w-4xl mx-auto border-2 border-primary rounded-lg p-4 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(Object.keys(baseDetails) as Base[]).map((base) => (
          <Card key={base} className="shadow-lg bg-card/80 backdrop-blur-sm border-border/20">
            <CardHeader>
              <CardTitle className="font-sans text-sm font-medium text-muted-foreground">{baseDetails[base].label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative flex items-center">
                <Label htmlFor={base} className="sr-only">{baseDetails[base].label}</Label>
                <Input
                  id={base}
                  type="text"
                  value={values[base]}
                  onChange={(e) => handleChange(base, e.target.value)}
                  className="font-code text-lg sm:text-xl md:text-2xl h-14 pr-12 bg-input/50 border-2 border-border/30 focus:border-primary focus:ring-primary"
                  placeholder={`Enter ${baseDetails[base].label}...`}
                  aria-invalid={!!error}
                  aria-describedby={error ? "error-message" : undefined}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-11 w-11 text-muted-foreground hover:text-foreground"
                  onClick={() => handleCopy(base)}
                  aria-label={`Copy ${baseDetails[base].label} value`}
                  disabled={!values[base]}
                >
                  {copiedBase === base ? (
                    <Check className="h-6 w-6 text-primary" />
                  ) : (
                    <ClipboardCopy className="h-6 w-6" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {error && (
        <div id="error-message" role="alert" className="mt-6 flex items-center justify-center gap-2 text-sm text-destructive">
          <AlertTriangle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
      <div className="mt-6">
        {conversionExplanations}
      </div>
    </div>
  );
}
