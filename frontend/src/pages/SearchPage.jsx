import { useState, useEffect } from "react";
import axios from "axios";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [history, setHistory] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/search",
        { term: query },
        { withCredentials: true }
      );
      setImages(res.data.results);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/history", {
          withCredentials: true,
        });
        setHistory(res.data);
      } catch (err) {
        console.error("Failed to fetch history:", err);
      }
    };
    fetchHistory();
  }, [images]); // re-fetch after each new search

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      <h1 className="text-4xl mb-6 font-bold">ImageSearch App 🔍</h1>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex mb-8">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search any image..."
          className="p-3 w-80 rounded-l-lg bg-gray-900 text-white outline-none"
        />
        <button className="bg-purple-600 px-5 rounded-r-lg hover:bg-purple-800 transition-all">
          Search
        </button>
      </form>

      {/* Image Results */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.urls.small}
            alt={img.alt_description}
            className="rounded-xl shadow-lg hover:scale-105 transition-transform"
          />
        ))}
      </div>

      {/* Personal History */}
      <div className="w-full max-w-3xl mt-10 bg-gray-900 p-5 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold mb-4">Your Search History</h2>
        {history.length === 0 ? (
          <p className="text-gray-400">No previous searches found.</p>
        ) : (
          <ul className="space-y-2">
            {history.map((item) => (
              <li
                key={item._id}
                onClick={() => setQuery(item.term)}
                className="cursor-pointer flex justify-between hover:text-purple-400"
              >
                <span>{item.term}</span>
                <span className="text-gray-500 text-sm">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
