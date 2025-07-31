import React, { useState, useEffect } from "react";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Presentation page sections
import Counters from "pages/Presentation/sections/Counters";
import Information from "pages/Presentation/sections/Information";
import NowPlaying from "pages/Presentation/sections/NowPlaying";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

// Images (local)
import bgImage1 from "assets/images/the-last-of-us.jpg";
import bgImage2 from "assets/images/joker.jpeg";
import bgImage3 from "assets/images/john-wick-ballerina.jpeg";

const bgImages = [bgImage1, bgImage2, bgImage3];

function Presentation() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    }, 5000); // change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={{
          type: "external",
          route: "https://www.creative-tim.com/product/material-kit-react",
          label: "login",
          color: "info",
        }}
        sticky
      />
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${bgImages[index]})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
          transition: "background-image 1s ease-in-out",
        }}
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <MKTypography
              variant="h1"
              color="white"
              mt={-6}
              mb={1}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              Welcome!{" "}
            </MKTypography>
            <MKTypography
              variant="body1"
              color="white"
              textAlign="center"
              px={{ xs: 6, lg: 12 }}
              mt={1}
            >
              Ratingo is your go-to website to find the best ratings for movies, shows, and more.
              Discover top-rated content and make informed choices.
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        <Counters />
        <Information />
        <NowPlaying />
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Presentation;
