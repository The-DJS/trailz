import styled from 'styled-components';

const CustomModal = styled.div`
    top: 50vh;
    left: 44vw;
    margin: auto;
    bottom: auto;
    position: absolute;
    display: block;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    overflow-y: auto;
`;

const ModalExitButton = styled.button`
  background-color: ForestGreen;
  font-weight: bolder;
  font-size: 1.5rem;
  width: 6%;
  height: 5%;
  border: 0px;
  color: AliceBlue;
  float: right;
`;

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

export {
  CustomModal,
  ModalExitButton,
  InfoButton,
};
