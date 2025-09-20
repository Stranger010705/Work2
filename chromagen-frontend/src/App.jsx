// App.jsx
import { useState } from "react";
import { SketchPicker } from "react-color";
import { isLoggedIn, logoutUser } from "./utils/auth";
import { usePalettes } from "./hooks/usePalettes";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import SavedPalettes from "./components/SavedPalettes";
import "./styles/animations.css";

// --- Helpers ---
function hexToRgb(hex) {
  let r = parseInt(hex.slice(1, 3), 16);
  let g = parseInt(hex.slice(3, 5), 16);
  let b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

function hexToHsl(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;
  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) h = s = 0;
  else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

function contrastOk(hex) {
  let rgb = hexToRgb(hex).match(/\d+/g).map(Number);
  let [r, g, b] = rgb.map((c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  let L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return L > 0.179;
}

// --- Color Blindness Simulation ---
function simulateColorBlind(hex, type = "normal") {
  if (type === "normal") return hex;

  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  let newR = r, newG = g, newB = b;

  switch (type) {
    case "protanopia": // red-blind
      newR = 0.56667 * r + 0.43333 * g;
      newG = 0.55833 * r + 0.44167 * g;
      newB = b;
      break;
    case "deuteranopia": // green-blind
      newR = 0.625 * r + 0.375 * g;
      newG = 0.7 * r + 0.3 * g;
      newB = b;
      break;
    case "tritanopia": // blue-blind
      newR = r;
      newG = 0.95 * g + 0.05 * b;
      newB = 0.43333 * g + 0.56667 * b;
      break;
    default:
      break;
  }

  const toHex = (c) => Math.round(Math.min(1, Math.max(0, c)) * 255).toString(16).padStart(2, "0");
  return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`;
}

// --- App Component ---
function App() {
  const loggedIn = isLoggedIn();
  const {
    palettes: savedPalettes,
    createFromDescription,
    createFromImage,
    loading: paletteLoading,
    error: paletteError,
  } = usePalettes();

  const [showLogin, setShowLogin] = useState(true);
  const [palette, setPalette] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [imageInput, setImageInput] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [showSaved, setShowSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState("");
  const [colorBlindMode, setColorBlindMode] = useState("normal");

  // --- Helpers ---
  const generateRandomPalette = () =>
    Array.from({ length: 5 }, () =>
      "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")
    );

  const generatePalette = async () => {
    setLoading(true);
    setLocalError("");
    try {
      let colors = [];
      if (textInput.trim()) {
        colors = await createFromDescription(textInput);
      } else if (imageFile) {
        colors = await createFromImage(imageFile, textInput || "Palette from image");
      }
      if (!colors || colors.length === 0) {
        colors = generateRandomPalette();
      }
      setPalette(colors);
    } catch (err) {
      console.error(err);
      setLocalError("Failed to generate palette: " + err.message);
      setPalette(generateRandomPalette());
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageInput(URL.createObjectURL(file));
    }
  };

  const updateColor = (color, index) => {
    const newPalette = [...palette];
    newPalette[index] = color.hex;
    setPalette(newPalette);
  };

  // --- JSX ---
  return (
    <div className="min-h-screen p-8 font-sans relative animated-gradient overflow-hidden text-white">
      {/* Floating blobs */}
      <div className="absolute w-72 h-72 bg-purple-400 blob-float top-10 left-10 opacity-50"></div>
      <div className="absolute w-96 h-96 bg-pink-400 blob-float bottom-10 right-20 opacity-40"></div>
      <div className="absolute w-64 h-64 bg-yellow-300 blob-float top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-40"></div>

      <div className="relative z-10">
        {!loggedIn ? (
          showLogin ? (
            <LoginForm onSwitchToRegister={() => setShowLogin(false)} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setShowLogin(true)} />
          )
        ) : (
          <>
            {/* Header */}
            <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-lg mb-8 flex justify-between items-center">
              <p className="font-semibold text-lg">Hello! Welcome back 🎨</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowSaved(!showSaved)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition"
                >
                  {showSaved ? "Hide" : "Show"} Saved ({savedPalettes.length})
                </button>
                <button
                  onClick={() => { logoutUser(); window.location.reload(); }}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:scale-105 transition"
                >
                  Logout
                </button>
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-10 text-center drop-shadow-lg">
              ChromaGen 🎨
            </h1>

            {showSaved && (
              <SavedPalettes
                palettes={savedPalettes}
                onLoadPalette={setPalette}
                loading={paletteLoading}
              />
            )}

            {(paletteError || localError) && (
              <div className="bg-red-100 text-red-800 px-4 py-3 rounded mb-6 max-w-3xl mx-auto">
                Error: {paletteError || localError}
              </div>
            )}

            {/* Generator */}
            <div className="bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-2xl max-w-3xl mx-auto mb-6">
              <input
                type="text"
                placeholder="Describe your palette (e.g., 'sunset over ocean')"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="w-full p-4 border rounded-lg mb-4 text-black focus:ring-2 focus:ring-purple-300"
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-4"
              />

              {imageInput && (
                <img
                  src={imageInput}
                  alt="Uploaded"
                  className="w-60 h-60 object-cover mx-auto mb-4 rounded-lg shadow"
                />
              )}

              <button
                onClick={generatePalette}
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg shadow-md hover:scale-105 transition disabled:opacity-50"
              >
                {loading ? "Generating..." : "Generate Palette"}
              </button>
            </div>

            {/* Color Blindness Mode */}
            <div className="flex justify-center mb-6">
              <select
                value={colorBlindMode}
                onChange={(e) => setColorBlindMode(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white/20 backdrop-blur-md text-white font-medium shadow-md"
              >
                <option value="normal">👁️ Normal Vision</option>
                <option value="protanopia">🔴 Protanopia (Red-Blind)</option>
                <option value="deuteranopia">🟢 Deuteranopia (Green-Blind)</option>
                <option value="tritanopia">🔵 Tritanopia (Blue-Blind)</option>
              </select>
            </div>

            {/* Palette Display */}
            {palette.length > 0 && (
              <div className="bg-white/20 backdrop-blur-md p-8 rounded-xl shadow-2xl max-w-5xl mx-auto mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
                  {palette.map((color, idx) => (
                    <div key={idx} className="flex flex-col items-center bg-white/20 p-4 rounded-xl shadow-md">
                      <div
                        className="w-28 h-28 rounded-xl mb-3 border cursor-pointer"
                        style={{ backgroundColor: simulateColorBlind(color, colorBlindMode) }}
                        onClick={() => navigator.clipboard.writeText(color)}
                        title="Click to copy"
                      />
                      <SketchPicker color={color} onChange={(c) => updateColor(c, idx)} />
                      <p className="text-sm font-mono">{color}</p>
                      <p className="text-xs font-mono">{hexToRgb(color)}</p>
                      <p className="text-xs font-mono">{hexToHsl(color)}</p>
                      <p className={`text-xs font-semibold mt-1 ${contrastOk(color) ? "text-green-400" : "text-red-400"}`}>
                        {contrastOk(color) ? "Good contrast" : "Low contrast"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
