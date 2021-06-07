import styled from 'styled-components';

const InfoButton = styled.button`
  margin: 0.5rem 0%;
  background-color: ForestGreen;
  font-weight: 900;
  font-size: 1rem;
  width: 100%;
  height: 1.25rem;
  border: 0px;
  color: AliceBlue;
  display: block;
`;

const InfoTitle = styled.h2`
  color: ForestGreen;
  font-weight: 900;
  margin-bottom: 1vh;
  font-size: 1rem;
  text-align: center;
`;

const LabelInfo = styled.p`
  font-size: 0.8rem;
  padding-bottom: 0.5rem;
  font-weight: bold;
  display: inline;
`;

const EventGroup = styled.div`
  display: block;
  margin-bottom: 1vh;
`;

// Events
const EventLocationInfo = styled.h3`
  color: ForestGreen;
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 0.75vh;
`;

const EventOwnerInfo = styled.h4`
  color: ForestGreen;
  font-size: 0.75rem;
  margin: auto;
  display: inline;
  padding-left: 0.75vw;
`;

const EventActivityInfo = styled.h5`
  color: ForestGreen;
  font-size: 0.75rem;
  margin: auto;
  display: inline;
  padding-left: 1vw;
`;

const EventDateInfo = styled.p`
  font-size: 0.7rem;
  font-weight: bold;
  margin-bottom: 0.75vh;
`;

const EventDescInfo = styled.div`
  font-size: 1rem;
  font-weight: normal;
  background: AliceBlue;
  margin-top: auto;
  margin-bottom: 0.75vh;
`;

const EventDescLineInfo = styled.p`
  margin: auto;
`;

const EventPubInfo = styled.h6`
  font-size: 0.7rem;
  font-weight: bold;
  color: green;
  margin-top: 0.5vh;
  margin-bottom: 0.5vh;
`;

const EventPrivInfo = styled.h6`
  font-size: 0.7rem;
  font-weight: bold;
  font-weight: normal;
  color: red;
  margin-top: 0.5vh;
  margin-bottom: 0.5vh;
`;

export {
  InfoButton,
  InfoTitle,
  LabelInfo,
  EventGroup,
  // Events
  EventLocationInfo,
  EventOwnerInfo,
  EventActivityInfo,
  EventDateInfo,
  EventDescInfo,
  EventDescLineInfo,
  EventPubInfo,
  EventPrivInfo,
};
