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

export {
  CustomModal,
  ModalExitButton,
};
