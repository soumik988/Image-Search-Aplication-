import React, { useEffect, useState } from "react";
import axios from "axios";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const HomePage = () => {
  const [term, setTerm] = useState("");
  const [images, setImages] = useState([]);
  const [topSearches, setTopSearches] = useState([]);
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState([]);
  const [user, setUser] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [lastSearch, setLastSearch] = useState({ term: "", count: 0 });

  const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true,
  });

  // Get logged-in user
  useEffect(() => {
    api.get("/auth/me").then((res) => setUser(res.data));
  }, []);

  // Get top searches
  useEffect(() => {
    api.get("/api/top-searches").then((res) => setTopSearches(res.data));
  }, []);

  // Get user search history
  useEffect(() => {
    api.get("/auth/history").then((res) => setHistory(res.data));
  }, []);

  // Search images
  const handleSearch = async (e, searchTerm = null) => {
    e?.preventDefault();
    const search = searchTerm || term;
    if (!search) return;

    try {
      const res = await api.post("/api/search", { term: search });
      setImages(res.data.results);
      setLastSearch({ term: search, count: res.data.results.length });

      setHistory((prev) => [
        { term: search, timestamp: new Date(), _id: new Date().getTime() },
        ...prev,
      ]);
      setTerm("");
      setSelected([]);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch images. Please try again.");
    }
  };

  // Toggle select/deselect single image
  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Select all images
  const selectAll = () => setSelected(images.map((img) => img.id));

  // Clear selection
  const clearSelection = () => setSelected([]);

  // Download selected images
  const handleDownload = async () => {
    if (selected.length === 0) return alert("No images selected");
    const zip = new JSZip();
    const folder = zip.folder("images");

    for (let id of selected) {
      const img = images.find((img) => img.id === id);
      try {
        const response = await fetch(img.urls.full);
        const blob = await response.blob();
        folder.file(`${id}.jpg`, blob);
      } catch (err) {
        console.error("Failed to fetch image:", img.id, err);
      }
    }

    zip.generateAsync({ type: "blob" }).then((content) => {
      saveAs(content, "images.zip");
    });
  };

  // Logout
  const handleLogout = async () => {
    await api.get("/auth/logout");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-0">
        <h1 className="text-2xl font-bold">🖼️ Image Search</h1>
        <div className="flex items-center gap-4">
          {user && (
            <>
              <img
                src={user.avatar}
                alt="user"
                className="w-10 h-10 rounded-full border"
              />
              <span>{user.name}</span>
            </>
          )}
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md w-full sm:w-auto"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Top Searches */}
      <div className="bg-gray-800 p-4 rounded-md text-center mb-6">
        <h2 className="text-lg font-semibold mb-2">🔥 Top Searches</h2>
        <div className="flex justify-center gap-2 sm:gap-3 flex-wrap">
          {topSearches.map((item, i) => (
            <span key={i} className="bg-gray-700 px-2 py-1 rounded-md text-sm sm:text-base">
              {item._id} ({item.count})
            </span>
          ))}
        </div>
      </div>

      {/* Search Bar + History */}
      <div className="flex flex-col sm:flex-row justify-center mb-4 relative w-full sm:w-1/2 mx-auto gap-2 sm:gap-0">
        <form onSubmit={handleSearch} className="flex w-full sm:flex-1">
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search images..."
            className="flex-1 p-2 rounded-l-md text-black w-full"
          />
          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        <button
          onClick={() => setShowHistory(!showHistory)}
          className="bg-gray-700 px-3 py-2 rounded-md hover:bg-gray-600 w-full sm:w-auto"
        >
          🕘 History
        </button>

        {/* History Dropdown */}
        {showHistory && history.length > 0 && (
          <div className="absolute top-16 sm:top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 border border-gray-600 rounded-md w-11/12 sm:w-1/2 max-h-60 overflow-y-auto z-10">
            {history.map((item) => (
              <button
                key={item._id}
                onClick={() => handleSearch(null, item.term)}
                className="w-full text-left px-4 py-2 hover:bg-gray-700 border-b border-gray-600 last:border-b-0"
              >
                {item.term} – {new Date(item.timestamp).toLocaleString()}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Multi-select Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-2">
        <button
          className="bg-green-600 px-4 py-2 rounded-md hover:bg-green-700 w-full sm:w-auto"
          onClick={selectAll}
        >
          Select All
        </button>
        <button
          className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-700 w-full sm:w-auto"
          onClick={clearSelection}
        >
          Clear Selection
        </button>
        {selected.length > 0 && (
          <button
            onClick={handleDownload}
            className="bg-yellow-600 px-4 py-2 rounded-md hover:bg-yellow-700 w-full sm:w-auto"
          >
            Download Selected
          </button>
        )}
      </div>

      {/* Selected Counter */}
      <p className="text-center mb-2">Selected: {selected.length} images</p>

      {/* Search Result Info */}
      {lastSearch.term && (
        <p className="text-center mb-4">
          You searched for "<span className="font-semibold">{lastSearch.term}</span>" – {lastSearch.count} results
        </p>
      )}

      {/* Image Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {images.length === 0 && lastSearch.term && (
          <p className="text-center text-red-400 col-span-full">
            No results found for "{lastSearch.term}"
          </p>
        )}
        {images.map((img) => (
          <div key={img.id} className="relative group">
            <img
              src={img.urls.small}
              alt={img.alt_description}
              className="rounded-lg transition-transform duration-300 group-hover:scale-105 w-full h-auto"
            />
            <input
              type="checkbox"
              checked={selected.includes(img.id)}
              onChange={() => toggleSelect(img.id)}
              className="absolute top-2 left-2 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
