"use client";
import React, { useEffect, useState } from "react";

const CustomTypewriter = ({ texts, speed = 100, delay = 1000 }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeoutId;

    const type = () => {
      const currentText = texts[currentIndex];

      if (isDeleting) {
        // Delete text
        setDisplayText((prev) => prev.substring(0, prev.length - 1));
      } else {
        // Add text
        setDisplayText((prev) => currentText.substring(0, prev.length + 1));
      }

      // Determine typing speed
      let typeSpeed = speed;

      if (isDeleting) {
        typeSpeed /= 2; // Faster deletion
      }

      // Check if text is fully typed or deleted
      if (!isDeleting && displayText === currentText) {
        // Pause before deleting
        typeSpeed = delay;
        setIsDeleting(true);
      } else if (isDeleting && displayText === "") {
        // Move to the next text
        setIsDeleting(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
      }

      // Schedule next update
      timeoutId = setTimeout(type, typeSpeed);
    };

    // Start the typing effect
    timeoutId = setTimeout(type, speed);

    // Cleanup
    return () => clearTimeout(timeoutId);
  }, [currentIndex, displayText, isDeleting, texts, speed, delay]);

  return (
    <span className="text-2xl text-amber-500 font-semibold tracking-wide">
      {displayText}
      <span className="blinking-cursor">|</span>
    </span>
  );
};

export default CustomTypewriter;