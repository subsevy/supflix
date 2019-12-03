import React from "react";
import styled from "styled-components";

import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.div`
  color: black;
  font-size: 16px;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Content = styled.ul`
  position: absolute;
  left: 20%;
  right: 20%;
  top: 20%;
  bottom: 20%;
  margin: auto;
  background: white;
  padding: 20px;
  overflow-y: auto;
  overflow-x: auto;
`;

const Divider = styled.span`
  margin: 0 10px;
`;

const Flag = styled.div`
  width: 20px;
  height: 16px;
  background-image: url(${props => props.bgImage});
  background-size: cover;
`;

const Logo = styled.img`
  width: 50%;
  height: 50%;
  margin-bottom: 20px;
  margin-top: 30px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Video = styled.li`
  margin-bottom: 20px;
`;

const Company = styled.li`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const Country = styled.li`
  margin-bottom: 20px;
  display: flex;
`;

const Season = styled.li`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  cursor: pointer;
  width: 10%;
  position: fixed;
  bottom: 22%;
  left: 45%;
  text-transform: uppercase;
  font-weight: 600;
  border: 2px solid #1abc9c;
  padding: 5px;
  border-radius: 3px;
  color: white;
  background-color: black;
`;

const Popup = ({ videos, companies, countries, seasons, closePopup }) => (
  <Container>
    <Content>
      {videos ? (
        <>
          <Title>Videos</Title>
          {videos.map(video => (
            <Video key={video.id}>
              <a
                href={`https://www.youtube.com/watch?v=${video.key}`}
                target="_blank"
              >
                <FontAwesomeIcon icon={faYoutube}></FontAwesomeIcon>
                {video.name}
              </a>
            </Video>
          ))}
        </>
      ) : null}
      {companies ? (
        <>
          <Title>Production Companies</Title>
          {companies.map(company => (
            <Company key={company.id}>
              {company.name}
              <Logo
                src={
                  company.logo_path
                    ? `https://image.tmdb.org/t/p/original${company.logo_path}`
                    : require("../assets/noPosterSmall.png")
                }
                alt="Logo"
              ></Logo>
            </Company>
          ))}
        </>
      ) : null}
      {countries ? (
        <>
          <Title>Production Countries</Title>
          {countries.map(country => (
            <Country key={country.iso_3166_1}>
              {country.name}
              <Divider>•</Divider>
              <Flag
                bgImage={require(`../assets/flagIcon/${country.iso_3166_1.toLowerCase()}.png`)}
              ></Flag>
            </Country>
          ))}
        </>
      ) : null}
      {seasons ? (
        <>
          <Title>Seasons</Title>
          {seasons.map(season => (
            <Season key={season.id}>
              <div>{season.name}</div>
              <Logo
                src={
                  season.poster_path
                    ? `https://image.tmdb.org/t/p/original${season.poster_path}`
                    : require("../assets/noPosterSmall.png")
                }
                alt="Poster"
              ></Logo>
            </Season>
          ))}
        </>
      ) : null}
      <Button onClick={closePopup}>close</Button>
    </Content>
  </Container>
);

export default Popup;
