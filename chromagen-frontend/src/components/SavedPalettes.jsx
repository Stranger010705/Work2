function SavedPalettes({ palettes }) {
  if (!palettes || palettes.length === 0) {
    return <p className="text-gray-300">No saved palettes yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {palettes.map((palette, idx) => (
        <div
          key={idx}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="flex">
            {palette.colors?.map((color, cidx) => (
              <div
                key={cidx}
                className="flex-1 h-16"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <div className="p-3">
            <p className="font-medium text-sm text-gray-700">
              {palette.description || "Untitled Palette"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SavedPalettes;
