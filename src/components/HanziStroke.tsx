import { useEffect, useRef, useState } from 'react';
import HanziWriter from 'hanzi-writer';

interface HanziStrokeProps {
  character: string;
}

const HanziStroke = ({ character }: HanziStrokeProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const writerRef = useRef<HanziWriter | null>(null);
  const [options, setOptions] = useState({
      showOutline: true,
      showCharacter: true,
      strokeAnimationSpeed: 1,
      delayBetweenStrokes: 200, 
  });

  useEffect(() => {
    if (targetRef.current && character) {
      // Clear previous writer if it exists
      if(writerRef.current) {
        writerRef.current.cancelQuiz(); // Clean up previous instance
      }
      writerRef.current = HanziWriter.create(targetRef.current, character, {
        width: 250,
        height: 250,
        padding: 5,
        ...options
      });
      writerRef.current.animateCharacter();
    }

    // Cleanup on unmount
    return () => {
        if(writerRef.current) {
            writerRef.current.cancelQuiz();
        }
    }

  }, [character]);

  // Update writer options dynamically
  useEffect(() => {
    if (writerRef.current) {
        writerRef.current.updateOptions(options);
    }
  }, [options]);

  const handleReplay = () => {
    writerRef.current?.animateCharacter();
  };

  const setSpeed = (speed: number) => {
      setOptions(prev => ({ ...prev, strokeAnimationSpeed: speed }));
  }

  return (
    <div className="flex flex-col items-center gap-4">
        <div ref={targetRef} className="border rounded-md bg-white dark:bg-gray-700"/>
        <div className="flex flex-wrap items-center justify-center gap-2">
            <button onClick={handleReplay} className="btn-control">Replay</button>
            <button onClick={() => setSpeed(1)} className={`btn-control ${options.strokeAnimationSpeed === 1 ? 'active' : ''}`}>Normal</button>
            <button onClick={() => setSpeed(2)} className={`btn-control ${options.strokeAnimationSpeed === 2 ? 'active' : ''}`}>Fast</button>
            <button onClick={() => setSpeed(0.5)} className={`btn-control ${options.strokeAnimationSpeed === 0.5 ? 'active' : ''}`}>Slow</button>
            <button onClick={() => setOptions(prev => ({ ...prev, showOutline: !prev.showOutline }))} className={`btn-control ${options.showOutline ? 'active' : ''}`}>Outline</button>
        </div>
    </div>
  )
};

// A reusable button style for the controls
const btnControlStyles = `
  px-3 py-1.5 text-sm font-medium rounded-md 
  bg-gray-200 text-gray-800 hover:bg-gray-300 
  dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500
  transition-colors
  &.active {
    background-color: #3b82f6; /* bg-blue-500 */
    color: white;
  }
`;

// This is a bit of a trick to use Tailwind-like classes with a static style approach
const styleSheet = document.createElement("style");
styleSheet.innerText = `
  .btn-control { ${btnControlStyles.replace(/\s+/g, ' ').trim()} }
  .btn-control.active { background-color: #3b82f6; color: white; }
`
document.head.appendChild(styleSheet);

export default HanziStroke;
