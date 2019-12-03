import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "../../Components/Loader";

import { faImdb } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "../../Components/Popup";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 30px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: flex-start;
`;

const VideoList = styled.div`
  margin-right: 30px;
`;

const ProductionList = styled.div`
  margin-right: 30px;
`;

const SeasonList = styled.div``;

const Button = styled.button`
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 600;
  border: 2px solid #1abc9c;
  padding: 5px;
  border-radius: 3px;
  color: black;
  background-color: rgba(255, 255, 255, 0.3);
`;

const DetailPresenter = ({
  result,
  error,
  loading,
  videosPopup,
  productionsPopup,
  seasonsPopup,
  toggleVideosPopup,
  toggleProductionsPopup,
  toggleSeasonsPopup
}) =>
  loading ? (
    <>
      <Helmet>
        <title>Loading | Supflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.original_title ? result.original_title : result.original_name}{" "}
          | Supflix
        </title>
      </Helmet>
      <Backdrop
        bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
      />
      <Content>
        <Cover
          bgImage={
            result.poster_path
              ? `https://image.tmdb.org/t/p/original${result.poster_path}`
              : require("../../assets/noPosterSmall.png")
          }
        />
        <Data>
          <Title>
            {result.original_title
              ? result.original_title
              : result.original_name}{" "}
          </Title>
          <ItemContainer>
            <Item>
              {result.release_date
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.runtime ? result.runtime : result.episode_run_time[0]} min
            </Item>
            <Divider>•</Divider>
            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>
            <Divider>•</Divider>
            <a
              href={`https://imdb.com/title/${
                result.imdb_id ? result.imdb_id : result.external_ids.imdb_id
              }`}
              target="_blank"
            >
              <FontAwesomeIcon icon={faImdb} size="2x"></FontAwesomeIcon>
            </a>
          </ItemContainer>
          <Overview>{result.overview}</Overview>
          <ButtonContainer>
            <VideoList>
              <Button onClick={toggleVideosPopup}>videos</Button>
              {videosPopup ? (
                <Popup
                  videos={result.videos.results}
                  closePopup={toggleVideosPopup}
                ></Popup>
              ) : null}
            </VideoList>
            <ProductionList>
              <Button onClick={toggleProductionsPopup}>production</Button>
              {productionsPopup ? (
                <Popup
                  companies={result.production_companies}
                  countries={result.production_countries}
                  closePopup={toggleProductionsPopup}
                ></Popup>
              ) : null}
            </ProductionList>
            {result.seasons ? (
              <SeasonList>
                <Button onClick={toggleSeasonsPopup}>seasons</Button>
                {seasonsPopup ? (
                  <Popup
                    seasons={result.seasons}
                    closePopup={toggleSeasonsPopup}
                  ></Popup>
                ) : null}
              </SeasonList>
            ) : null}
          </ButtonContainer>
        </Data>
      </Content>
    </Container>
  );

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  showPopup: PropTypes.bool,
  togglePopup: PropTypes.func
};

export default DetailPresenter;
