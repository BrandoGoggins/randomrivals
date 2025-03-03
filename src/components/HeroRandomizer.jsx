import React, { useState, useEffect } from "react";
import heroes from "../data/heroes.json";
import HeroCard from "./HeroCard";

function HeroRandomizer() {
  const [selectedHero, setSelectedHero] = useState(heroes[0]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload all hero images
  useEffect(() => {
    const preloadImages = () => {
      const promises = heroes.map((hero) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = hero.image; // Assuming hero object has an `image` property
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      Promise.all(promises)
        .then(() => setImagesLoaded(true))
        .catch((error) => console.error("Error preloading images:", error));
    };

    preloadImages();
  }, []);

  // Modified easing function to minimize hangs
  const easeOutExpo = (x) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));

  const randomizeHero = () => {
    if (isSpinning || isFadingOut) return; // Prevent re-triggering

    setIsFadingOut(true);

    const fadeOutDuration = 300; // Match CSS fade-out animation time
    setTimeout(() => {
      setIsFadingOut(false);
      setIsSpinning(true);

      // Spinner logic with fractional indices for smoothness
      const spinDuration = 2000; // Total spinner time (2 seconds)
      const totalHeroes = heroes.length;

      let startTime = null;

      const spin = (timestamp) => {
        if (!startTime) startTime = timestamp;

        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / spinDuration, 1); // Normalize progress (0 to 1)
        const easedProgress = easeOutExpo(progress); // Apply ease-out exponential easing

        // Calculate fractional index for smooth interpolation
        const fractionalIndex = easedProgress * (totalHeroes - 1);
        const currentIndex = Math.floor(fractionalIndex) % totalHeroes;

        setCurrentHeroIndex(currentIndex);

        if (progress < 1) {
          requestAnimationFrame(spin); // Continue spinning
        } else {
          // End the spin and snap to a final hero
          const randomIndex = Math.floor(Math.random() * totalHeroes);
          setSelectedHero(heroes[randomIndex]);
          setIsSpinning(false);
        }
      };

      requestAnimationFrame(spin); // Start the animation loop
    }, fadeOutDuration);
  };

  return (
    <div className="hero-randomizer-container">
      <h1 className="title">Marvel Rivals Hero Randomizer</h1>
      <p className="instructions">
        Click the hero card to randomize your next hero!
      </p>

      {imagesLoaded ? (
        <div
          onClick={randomizeHero}
          className={`clickable-card ${isFadingOut ? "fading-out" : ""}`}
        >
          {isSpinning ? (
            <HeroCard isSpinning={isSpinning} hero={heroes[currentHeroIndex]} />
          ) : (
            <HeroCard hero={selectedHero} isFadingOut={isFadingOut} />
          )}
        </div>
      ) : (
        <p>Loading heroes...</p>
      )}
    </div>
  );
}

export default HeroRandomizer;
