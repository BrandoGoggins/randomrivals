import React, { useState, useEffect } from "react";
import heroes from "../data/heroes.json";
import HeroCard from "./HeroCard";

function HeroRandomizer() {
  const [selectedHero, setSelectedHero] = useState(heroes[0]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload hero images
  useEffect(() => {
    const preloadImages = async () => {
      try {
        await Promise.all(
          heroes.map((hero) => {
            const img = new Image();
            img.src = hero.image;
            return new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject; // Handle errors (e.g., canceled requests)
            });
          })
        );
        setImagesLoaded(true);
      } catch (error) {
        console.error("Error preloading images:", error);
        setImagesLoaded(true); // Proceed even if some fail, to avoid stalling
      }
    };
    preloadImages();
  }, []);

  const randomizeHero = () => {
    if (isSpinning || !imagesLoaded) return; // Wait for images to load

    setIsSpinning(true);
    const spinDuration = 2000;
    let elapsed = 0;
    const interval = 100;

    const spinInterval = setInterval(() => {
      elapsed += interval;
      const randomIndex = Math.floor(Math.random() * heroes.length);
      setSelectedHero(heroes[randomIndex]);

      if (elapsed >= spinDuration) {
        clearInterval(spinInterval);
        setIsSpinning(false);
        setSelectedHero(heroes[Math.floor(Math.random() * heroes.length)]);
      }
    }, interval);
  };

  return (
    <div className="hero-randomizer-container">
      <h1 className="title">Marvel Rivals Hero Randomizer</h1>
      <p className="instructions">
        Click the hero card to randomize your next hero!
      </p>
      {imagesLoaded ? (
        <div onClick={randomizeHero} className="clickable-card">
          <HeroCard hero={selectedHero} isSpinning={isSpinning} />
        </div>
      ) : (
        <p>Loading heroes...</p>
      )}
    </div>
  );
}

export default HeroRandomizer;
