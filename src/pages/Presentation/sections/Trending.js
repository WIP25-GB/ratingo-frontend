import React from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import MKBox from "components/MKBox";

// Rotating Card Components
import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";

// Images
import bgFront from "assets/images/rotating-card-bg-front.jpeg";
import bgBack from "assets/images/rotating-card-bg-back.jpeg";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./sliderStyles.css"; // (optional styling)

// Dummy movie data
const movies = [
  {
    title: "Inception",
    poster: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg",
    rating: 8.8,
  },
  {
    title: "Interstellar",
    poster: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
    rating: 8.6,
  },
  {
    title: "The Dark Knight",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    rating: 9.0,
  },
];

function SimpleMovieSection() {
  return (
    <MKBox component="section" py={6} my={6}>
      <Container>
        <Grid container spacing={3} alignItems="center">
          {/* Rotating Card */}
          <Grid item xs={12} lg={4}>
            <RotatingCard>
              <RotatingCardFront
                image={bgFront}
                icon="whatshot"
                title="Now Trending"
                description="Top picks from our collection."
              />
              <RotatingCardBack
                image={bgBack}
                title="Explore More"
                description="Check out more popular movies."
                action={{
                  type: "internal",
                  route: "/",
                  label: "See All",
                }}
              />
            </RotatingCard>
          </Grid>

          {/* Movie Slider */}
          <Grid item xs={12} lg={8}>
            <Swiper spaceBetween={20} slidesPerView={2}>
              {movies.map((movie, index) => (
                <SwiperSlide key={index}>
                  <div style={{ textAlign: "center" }}>
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      style={{ width: "100%", borderRadius: "10px" }}
                    />
                    <h4>{movie.title}</h4>
                    <p>⭐ {movie.rating}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default SimpleMovieSection;
