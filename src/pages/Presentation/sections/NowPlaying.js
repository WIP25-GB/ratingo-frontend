import React, { useEffect, useState } from "react";
import axios from "axios";

const NowPlaying = () => {
  // Read ?page=… on mount
  const params = new URLSearchParams(window.location.search);
  const initialPage = parseInt(params.get("page"), 10) || 1;

  const [movies, setMovies] = useState([]);
  // ← use initialPage here
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  // selectedMovie to track movie for popup modal ***
  const [selectedMovie, setSelectedMovie] = useState(null);

  const backend_ip = process.env.REACT_APP_BACKEND_ENDPOINT;

  useEffect(() => {
    // Sync the URL
    const newParams = new URLSearchParams(window.location.search);
    newParams.set("page", currentPage);
    window.history.replaceState(null, "", `?${newParams.toString()}`);

    // Fetch data
    axios
      .get(`http://${backend_ip}:5000/?page=${currentPage}`)
      .then((response) => {
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => {
        console.error("Failed to fetch movies:", error);
      });
  }, [currentPage]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((p) => p + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((p) => p - 1);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 200px)", // fixed tile width
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "10px",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
              // scale tile smoothly on hover
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              // NEW: open modal popup on click
              onClick={() => setSelectedMovie(movie)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "100%", borderRadius: "4px" }}
              />

              <h4 style={{ margin: "10px 0 5px 0", fontSize: "16px", textAlign: "center" }}>
                {movie.title}
              </h4>

              <div style={{ textAlign: "center", fontWeight: "bold", fontSize: "14px" }}>
                <span style={{ marginRight: "5px" }}>⭐</span>
                <span>{movie.vote_average}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          style={paginationButtonStyle}
        >
          ←
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          style={paginationButtonStyle}
        >
          →
        </button>
      </div>
      {/* *** NEW: Modal popup for selected movie *** */}
      {selectedMovie && (
        <div
          onClick={() => setSelectedMovie(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            animation: "fadeIn 0.3s ease",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
              width: "75vw", // ✅ 75% of viewport width
              maxWidth: "800px", // ✅ Max width limit
              borderRadius: "10px",
              padding: "20px",
              position: "relative",
              display: "flex",
              flexWrap: "wrap", // ✅ Allows vertical stacking on smaller screens
              animation: "scaleIn 0.3s ease",
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)", // ✅ Subtle depth
            }}
          >
            {/* X button top-right */}
            <div
              onClick={() => setSelectedMovie(null)}
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                fontSize: "28px",
                fontWeight: "bold",
                cursor: "pointer",
                userSelect: "none",
                lineHeight: "1",
              }}
              aria-label="Close modal"
              title="Close"
            >
              &times;
            </div>

            <img
              src={`https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}`}
              alt={selectedMovie.title}
              style={{ borderRadius: "12px", flexShrink: 0, maxHeight: "70vh" }}
            />

            <div
              style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <h2>{selectedMovie.title}</h2>
              <p style={{ textAlign: "center" }}>{selectedMovie.overview}</p>

              <div
                style={{
                  marginTop: "25px",
                  fontWeight: "bold",
                  fontSize: "26px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <span>⭐</span>
                <span>{selectedMovie.vote_average}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* *** END: Modal popup for selected movie *** */}

      <style>
        {`
                @keyframes fadeIn {
                  from { opacity: 0; }
                  to { opacity: 1; }
                }
                @keyframes scaleIn {
                  from { transform: scale(0.8); }
                  to { transform: scale(1); }
                }
              `}
      </style>
    </div>
  );
};

const paginationButtonStyle = {
  padding: "10px 20px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  fontSize: "16px",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

export default NowPlaying;
