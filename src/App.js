import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("sanidlkx");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchVideoData = async () => {
      setLoading(true);
      try {
        const response = await axios({
          method: "GET",
          url: `https://porn-videos.p.rapidapi.com/video/${query}`,
          headers: {
            "x-rapidapi-key":
              "c72c804f5bmsh5f8cd831b7aa9a8p1fc11ejsn9d8306a795a3",
            "x-rapidapi-host": "porn-videos.p.rapidapi.com",
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        setVideoData(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("No Videos Found");
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  return (
    <div className="Corn-Hub">
      <div className="navbar">
        <div className="title">
          🌽 <span>Hub</span>
        </div>
        <form action="Post" onSubmit={handleSubmit}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
          />
        </form>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && videoData.length > 0 ? (
        <div className="video-section">
          {videoData.map((video, index) => (
            <div className="video-container" key={index}>
              <a
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="video-card"
              >
                <div className="video-img">
                  <img src={video.mainThumbnail} alt="" />
                </div>
                <div className="video-desc">
                  <div className="video-title">{video.title}</div>
                  <div className="video-duration">{video.duration}</div>
                </div>
              </a>
            </div>
          ))}
        </div>
      ) : (
        !loading && !error && videoData.length < 0 && <p>No videos found.</p>
      )}
    </div>
  );
};

export default App;
