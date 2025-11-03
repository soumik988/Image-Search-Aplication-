import { useEffect, useState } from "react";
import axios from "axios";

function SearchHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/history", {
          withCredentials: true,
        });
        setHistory(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        🕓 Your Search History
      </h1>

      {history.length === 0 ? (
        <p className="text-gray-400 text-center">No search history yet.</p>
      ) : (
        <div className="max-w-2xl mx-auto bg-gray-900 p-4 rounded-xl shadow-lg">
          {history.map((item, i) => (
            <div
              key={i}
              className="flex justify-between items-center border-b border-gray-700 py-2"
            >
              <span className="text-lg">{item.term}</span>
              <span className="text-sm text-gray-400">
                {new Date(item.timestamp).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchHistory;
