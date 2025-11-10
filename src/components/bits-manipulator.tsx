
"use client";

import { useState, useCallback, useMemo } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Bit } from './bit';
import { ArrowLeft, ArrowRight, RefreshCcw, RotateCcw, Trash2, Wand2 } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';

export function BitsManipulator() {
    const [bits, setBits] = useState<number[]>(Array(32).fill(0));
    const [inputValue, setInputValue] = useState<string>("");

    const binaryString = useMemo(() => bits.join(''), [bits]);
    const unsignedInt = useMemo(() => parseInt(binaryString, 2), [binaryString]);
    const signedInt = useMemo(() => {
        if (bits[0] === 0) return unsignedInt;
        // Two's complement for negative numbers
        let inverted = bits.map(b => 1 - b);
        let lastOne = inverted.lastIndexOf(1);
        if(lastOne === -1) { // -2^31 case
            return -2147483648;
        }
        let flipped = inverted.map((b, i) => i > lastOne ? 1-b : b);

        return -parseInt(flipped.join(''), 2);

    }, [bits, unsignedInt]);

    const hexValue = useMemo(() => unsignedInt.toString(16).toUpperCase().padStart(8, '0'), [unsignedInt]);


    const toggleBit = useCallback((index: number) => {
        setBits(currentBits => {
            const newBits = [...currentBits];
            newBits[index] = newBits[index] === 0 ? 1 : 0;
            return newBits;
        });
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        if (value.trim() === '') {
            setBits(Array(32).fill(0));
            return;
        }
        const num = Number(value);
        if (!isNaN(num) && Number.isInteger(num)) {
            // Handle negative numbers with two's complement
            const binary = (num >>> 0).toString(2).padStart(32, '0');
            setBits(binary.split('').map(Number));
        }
    }

    const setAll = () => setBits(Array(32).fill(1));
    const clearAll = () => {
      setBits(Array(32).fill(0));
      setInputValue("");
    };
    const invert = () => setBits(bits.map(b => 1 - b));

    const shiftLeft = () => setBits(currentBits => [ ...currentBits.slice(1), 0]);
    const shiftRight = () => setBits(currentBits => [0, ...currentBits.slice(0, -1)]);
    
    const rotateLeft = () => setBits(currentBits => [ ...currentBits.slice(1), currentBits[0]]);
    const rotateRight = () => setBits(currentBits => [currentBits[currentBits.length - 1], ...currentBits.slice(0, -1)]);

    const renderBits = (start: number, end: number) => {
        return bits.slice(start, end).map((bit, index) => (
            <Bit key={start + index} bit={bit as 0 | 1} onClick={() => toggleBit(start + index)} />
        ));
    };

    return (
        <Card className="w-full max-w-4xl mx-auto mt-8 glowing-card bg-card/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="font-sans text-lg font-medium text-foreground">Binary Bit Manipulation</CardTitle>
                <CardDescription>An interactive 32-bit integer playground. Click bits or use controls to see values change.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap items-center justify-center gap-2 p-4 bg-muted/50 rounded-lg">
                   <div className="flex items-center gap-1 p-2 border-r border-border/30 pr-3">
                     <span className="text-xs text-muted-foreground mr-2" title="Bit 31">31</span>
                     {renderBits(0, 8)}
                     <span className="text-xs text-muted-foreground ml-2" title="Bit 24">24</span>
                   </div>
                   <div className="flex items-center gap-1 p-2 border-r border-border/30 pr-3">
                     {renderBits(8, 16)}
                     <span className="text-xs text-muted-foreground ml-2" title="Bit 16">16</span>
                   </div>
                   <div className="flex items-center gap-1 p-2 border-r border-border/30 pr-3">
                     {renderBits(16, 24)}
                      <span className="text-xs text-muted-foreground ml-2" title="Bit 8">8</span>
                   </div>
                   <div className="flex items-center gap-1 p-2">
                     {renderBits(24, 32)}
                      <span className="text-xs text-muted-foreground ml-2" title="Bit 0">0</span>
                   </div>
                </div>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div>
                        <Label htmlFor="input-decimal" className="text-sm font-medium text-muted-foreground">Set Integer Value</Label>
                        <Input id="input-decimal" type="number" value={inputValue} onChange={handleInputChange} placeholder="e.g. 42" className="mt-1 w-full max-w-xs mx-auto text-center font-code bg-input/50"/>
                    </div>
                     <div>
                        <p className="text-sm font-medium text-muted-foreground">Signed Decimal</p>
                        <p className="font-code text-2xl font-bold text-primary">{signedInt.toLocaleString()}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Hexadecimal</p>
                        <p className="font-code text-2xl font-bold text-accent">0x{hexValue}</p>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex flex-wrap justify-center gap-2 md:gap-4 bg-muted/20 py-4">
                    <Button onClick={setAll} variant="outline" size="sm"><RotateCcw className="mr-2 h-4 w-4"/> Set All</Button>
                    <Button onClick={invert} variant="outline" size="sm"><Wand2 className="mr-2 h-4 w-4"/> Invert (NOT)</Button>
                    <Button onClick={shiftLeft} variant="outline" size="sm"><ArrowLeft className="mr-2 h-4 w-4"/> Shift Left</Button>
                    <Button onClick={shiftRight} variant="outline" size="sm"><ArrowRight className="mr-2 h-4 w-4"/> Shift Right</Button>
                    <Button onClick={rotateLeft} variant="outline" size="sm"><RefreshCcw className="mr-2 h-4 w-4 transform -scale-x-100"/> Rotate Left</Button>
                    <Button onClick={rotateRight} variant="outline" size="sm"><RefreshCcw className="mr-2 h-4 w-4"/> Rotate Right</Button>
                    <Button onClick={clearAll} variant="destructive" size="sm"><Trash2 className="mr-2 h-4 w-4"/> Clear All</Button>
            </CardFooter>
        </Card>
    );
}
