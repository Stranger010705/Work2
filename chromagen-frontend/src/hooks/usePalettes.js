import { useState, useEffect } from "react";
import { createPalette, listPalettes } from "../utils/api";
import { getAccessToken } from "../utils/auth";

export const usePalettes = () => {
  const [palettes, setPalettes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPalettes = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getAccessToken();
      const res = await listPalettes(token);
      setPalettes(res || []);
    } catch (err) {
      setError(err.message || "Failed to fetch palettes");
    } finally {
      setLoading(false);
    }
  };

  const createFromDescription = async (description) => {
    const token = getAccessToken();
    return createPalette(description, null, token);
  };

  const createFromImage = async (file, description) => {
    const token = getAccessToken();
    return createPalette(description, file, token);
  };

  useEffect(() => {
    fetchPalettes();
  }, []);

  return { palettes, loading, error, createFromDescription, createFromImage };
};
