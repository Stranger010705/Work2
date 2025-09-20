import React, { useState } from "react";

export default function Palette() {
  const [prompt, setPrompt] = useState("");
  const [palette, setPalette] = useState([]);

  function handleGenerate() {
    if (!prompt.trim()) {
      alert("Please enter a prompt!");
      return;
    }

    // For now, mock palette colors (will connect to backend later)
    const mockColors = [
      "#FF5733",
      "#33FF57",
      "#3357FF",
      "#F1C40F",
      "#8E44AD",
    ];

    setPalette(mockColors);
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>ChromaGen Palette Builder</h1>

      <div style={{ marginBottom: "16px" }}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your palette (e.g., 'sunset beach vibes')"
          style={{ width: "100%", height: "80px", padding: "8px" }}
        />
      </div>

      <button
        onClick={handleGenerate}
        style={{
          padding: "10px 16px",
          background: "#0066ff",
          color: "white",
          border: "none",
          borderRadius: "6px",
        }}
      >
        Generate Palette
      </button>

      {palette.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h2>Generated Palette</h2>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {palette.map((color, idx) => (
              <div
                key={idx}
                style={{
                  width: "100px",
                  height: "100px",
                  backgroundColor: color,
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                {color}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
