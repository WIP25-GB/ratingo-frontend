import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./sliderStyles.css";

import { EffectCoverflow, Pagination } from "swiper/modules";
import axios from "axios";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function TrendingSlider() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000")
      .then((res) => setMovies(res.data.results)) // Use results array
      .catch((err) => console.error("Failed to fetch movies:", err));
  }, []);

  return (
    <div className="trending-slider">
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={movie.id || index}>
            <div className="slide-content">
              <div className="movie-rank">#{index + 1}</div>
              <img
                src={
                  movie.poster_path
                    ? IMAGE_BASE_URL + movie.poster_path
                    : "https://via.placeholder.com/300x450"
                }
                alt={movie.title}
              />
              <div className="movie-title">{movie.title}</div>
              <div className="movie-rating">⭐ {movie.vote_average.toFixed(1)}</div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default TrendingSlider;
