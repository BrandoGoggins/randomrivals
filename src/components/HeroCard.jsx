import React from "react";
import vanguardIcon from "../assets/Vanguard.webp"; // Replace with the actual path
import strategistIcon from "../assets/Strategist.webp"; // Replace with the actual path
import duelistIcon from "../assets/Duelist.webp"; // Replace with the actual path

function HeroCard({ hero, isSpinning, isFadingOut }) {
  const roleIcons = {
    Vanguard: vanguardIcon,
    Strategist: strategistIcon,
    Duelist: duelistIcon,
  };

  return (
    <div className="hero-card">
      <img src={hero.image} alt={hero.name} className="hero-image" />
      <div
        className={`hero-text-container 
                    ${isSpinning ? "isSpinning" : ""}
          ${isFadingOut ? "fading-out" : ""} 
        ${!isSpinning && !isFadingOut ? "fade-in" : ""}`}
      >
        <div className="hero-text">
          <h2 className="hero-name">{hero.name}</h2>
          <p className="hero-role">{hero.role}</p>
        </div>
        <div className="role-icon">
          <img
            src={roleIcons[hero.role]}
            alt={hero.role}
            className="role-image"
            title={hero.role}
          />
        </div>
      </div>
    </div>
  );
}

export default HeroCard;
