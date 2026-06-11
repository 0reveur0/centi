import HanziWriter from 'hanzi-writer';
import { useEffect, useRef } from 'react';

interface HanziStrokeProps {
  character: string;
}

const HanziStroke = ({ character }: HanziStrokeProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<HanziWriter | null>(null);

  useEffect(() => {
    if (targetRef.current) {
      writerRef.current = HanziWriter.create(targetRef.current, character, {
        width: 200,
        height: 200,
        padding: 5,
        strokeColor: '#166534', 
        radicalColor: '#dc2626',
        showOutline: true,
        strokeAnimationSpeed: 1,
        delayBetweenStrokes: 100,
      });
    }

    return () => {
      if (writerRef.current) {
        writerRef.current.quiz();
      }
    };
  }, [character]);

  return <div ref={targetRef} className="mx-auto" style={{ width: 200, height: 200 }} />;
};

export default HanziStroke;
