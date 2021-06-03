import styled from 'styled-components';

const InfoButton = styled.button`
  margin: 0.5rem 0%;
  background-color: ForestGreen;
  font-weight: 800;
  font-size: 1rem;
  width: 100%;
  height: 1.25rem;
  border: 0px;
  color: AliceBlue;
  display: block;
`;

const InfoTitle = styled.h2`
  color: ForestGreen;
  margin-bottom: 1vh;
  font-size: 1rem;
`;

const LabelInfo = styled.p`
  font-size: 0.8rem;
  padding-bottom: 0.5rem;
  display: inline;
`;

const EventGroup = styled.div`
  display: block;
  margin-bottom: 1vh;
`;

// Events
const EventLocationInfo = styled.h3`
  color: ForestGreen;
  font-size: 1rem;
  margin-bottom: 1vh;
`;

const EventOwnerInfo = styled.h4`
  color: ForestGreen;
  font-size: 0.75rem;
  margin: auto;
  display: inline;
  padding-left: 2vw;
`;

const EventDateInfo = styled.p`
  font-size: 0.7rem;
  font-weight: bold;
  margin-bottom: 0.75vh;
`;

const EventDescInfo = styled.p`
  font-size: 1rem;
  font-weight: normal;
  background: AliceBlue;
  margin-top: auto;
  margin-bottom: 0.75vh;
`;

const EventPubInfo = styled.h5`
  font-size: 0.7rem;
  font-weight: bold;
  color: green;
  margin-top: 0.5vh;
  margin-bottom: 0.5vh;
`;

const EventPrivInfo = styled.h5`
  font-size: 0.7rem;
  font-weight: bold;
  font-weight: normal;
  color: red;
  margin-top: 0.5vh;
  margin-bottom: 0.5vh;
`;

const EventAttendeesInfo = styled.p`
  font-size: 0.75rem;
  font-style: italic;
  background: AliceBlue;
  padding-left: 1vw;
  display: inline;
`;

export {
  InfoButton,
  InfoTitle,
  LabelInfo,
  EventGroup,
  // Events
  EventLocationInfo,
  EventOwnerInfo,
  EventDateInfo,
  EventDescInfo,
  EventPubInfo,
  EventPrivInfo,
  EventAttendeesInfo,
};
