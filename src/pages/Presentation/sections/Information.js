// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import React, { useEffect, useState } from "react";

// Material Kit 2 React examples
import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";

// Images
import bgFront from "assets/images/rotating-card-bg-front.jpeg";
import bgBack from "assets/images/rotating-card-bg-back.jpeg";

function Information() {
  const [movies, setMovies] = useState([]);
  const backend_ip = process.env.REACT_APP_BACKEND_ENDPOINT;

  useEffect(() => {
    fetch(`http://${backend_ip}:8080/`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched movies:", data); // Log the fetched data
        setMovies(data);
      })
      .catch((err) => {
        console.error("Failed to fetch movies", err);
      });
  }, []);

  const firstMovie = movies.length > 0 ? movies[0] : null;
  const firstMovieposterImage = firstMovie && firstMovie.Poster ? firstMovie.Poster : bgBack;

  const secondMovie = movies.length > 1 ? movies[1] : null;
  const secondMovieposterImage = secondMovie && secondMovie.Poster ? secondMovie.Poster : bgBack;

  const thirdMovie = movies.length > 2 ? movies[2] : null;
  const thirdMovieposterImage = thirdMovie && thirdMovie.Poster ? thirdMovie.Poster : bgBack;

  const forthMovie = movies.length > 2 ? movies[3] : null;
  const forthMovieposterImage = forthMovie && forthMovie.Poster ? forthMovie.Poster : bgBack;

  return (
    <MKBox
      component="section"
      py={6}
      my={6}
      variant="contained"
      bgColor="white"
      opacity={1}
      shadow="none"
      coloredShadow="none"
    >
      <Container>
        <Grid container item xs={11} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
          <Grid item xs={12} sm={6} md={4} lg={3} sx={{ mx: "auto" }}>
            <RotatingCard>
              <RotatingCardFront
                image={bgFront}
                icon="whatshot"
                title={
                  <>
                    Top
                    <br />
                    Trending
                  </>
                }
              />
              <RotatingCardBack
                image={firstMovieposterImage}
                //title={firstMovie ? firstMovie.Title : "No Movie Found"}
                //description={firstMovie ? `Rating: ${firstMovie.imdbRating || "N/A"}` : ""}
                //action={
                //  firstMovie
                //    ? {
                //        type: "external",
                //        route: `https://www.imdb.com/title/${firstMovie.imdbID}`,
                //        label: "View on IMDB",
                //      }
                //    : {
                //        type: "internal",
                //        route: "/sections/page-sections/page-headers",
                //        label: "Go Back",
                //      }
                //}
              />
            </RotatingCard>
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3} sx={{ mx: "auto" }}>
            <RotatingCard>
              <RotatingCardFront
                image={bgFront}
                icon="whatshot"
                title={
                  <>
                    Top
                    <br />
                    Trending
                  </>
                }
              />
              <RotatingCardBack
                image={secondMovieposterImage}
                //title={secondMovie ? secondMovie.Title : "No Movie Found"}
                //description={secondMovie ? `Rating: ${secondMovie.imdbRating || "N/A"}` : ""}
                //action={
                //  secondMovie
                //    ? {
                //        type: "external",
                //        route: `https://www.imdb.com/title/${secondMovie.imdbID}`,
                //        label: "View on IMDB",
                //      }
                //    : {
                //        type: "internal",
                //        route: "/sections/page-sections/page-headers",
                //        label: "Go Back",
                //      }
                //}
              />
            </RotatingCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} sx={{ mx: "auto" }}>
            <RotatingCard>
              <RotatingCardFront
                image={bgFront}
                icon="whatshot"
                title={
                  <>
                    Top
                    <br />
                    Trending
                  </>
                }
              />
              <RotatingCardBack
                image={thirdMovieposterImage}
                //title={thirdMovie ? thirdMovie.Title : "No Movie Found"}
                //description={thirdMovie ? `Rating: ${thirdMovie.imdbRating || "N/A"}` : ""}
                //action={
                //thirdMovie
                //? {
                //type: "external",
                //route: `https://www.imdb.com/title/${thirdMovie.imdbID}`,
                //label: "View on IMDB",
                //}
                //: {
                //type: "internal",
                //route: "/sections/page-sections/page-headers",
                //label: "Go Back",
                //}
                //}
              />
            </RotatingCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3} sx={{ mx: "auto" }}>
            <RotatingCard>
              <RotatingCardFront
                image={bgFront}
                icon="whatshot"
                title={
                  <>
                    Top
                    <br />
                    Trending
                  </>
                }
              />
              <RotatingCardBack
                image={forthMovieposterImage}
                //title={forthMovie ? forthMovie.Title : "No Movie Found"}
                //description={forthMovie ? `Rating: ${forthMovie.imdbRating || "N/A"}` : ""}
                //action={
                //  forthMovie
                //    ? {
                //        type: "external",
                //        route: `https://www.imdb.com/title/${forthMovie.imdbID}`,
                //        label: "View on IMDB",
                //      }
                //    : {
                //        type: "internal",
                //        route: "/sections/page-sections/page-headers",
                //        label: "Go Back",
                //      }
                //}
              />
            </RotatingCard>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
