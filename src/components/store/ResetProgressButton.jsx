import React from "react";
import { resetListeningProgress } from "../../data/resetProgress";
import "./ResetProgressButton.css"; // for custom styling

export default function ResetProgressButton({ onReset }) {
  const handleReset = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset all your listening progress? This cannot be undone."
    );
    if (confirmReset) {
      const cleared = resetListeningProgress();
      onReset?.(); // trigger UI refresh
      alert(`✅ Listening history reset. ${cleared} episodes unmarked.`);
    }
  };

  return (
    <button className="reset-progress-button" onClick={handleReset}>
      🔄 Reset Listening History
    </button>
  );
}
