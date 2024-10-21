

// HoverDiv.tsx
import React from 'react';
import './components.css'

interface HoverDivProps {
  children: React.ReactNode; // To allow wrapping any JSX content
}

const HoverDiv: React.FC<HoverDivProps> = ({ children }) => {
  return (
    <div
      style={{
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
      }}
      className="hover-wrap"
    >
      {children}
    </div>
  );
};

export default HoverDiv;

