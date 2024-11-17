import { useState, useEffect } from 'react';

const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, 30); // 타이핑 속도 조절

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text]);

  return <div className='whitespace-pre-line'>{displayText}</div>;
};

export default TypewriterEffect;
