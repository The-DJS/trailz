import styled from 'styled-components';

const FavFormGroup = styled.div`
  color: SlateGray;
  display: block;
  width: 80vw;
  margin-top: 32vh;
`;

const FavFormLabel = styled.label`
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: ForestGreen;
  display: block;
`;

const FavFormInput = styled.input`
  padding: 0.5rem;
  color: SlateGray;
  background: AliceBlue;
  border: none;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 0.5rem;
  &:invalid {
    border: 2px solid red;
  }
`;

const FavFormMessage = styled.label`
  margin-bottom: 0.5rem;
  background: AliceBlue;
  width: 100%;
  color: SlateGray;
  display: block;
`;

const FavFormRequiredMessage = styled.label`
  margin-bottom: 0.5rem;
  margin-top:0.5rem;
  width: 100%;
  font-weight: bold;
  color: red;
  display: block;
`;

const FavFormButton = styled.button`
  margin-bottom: 0.5rem;
  margin-top:0.5rem;
  background-color: ForestGreen;
  font-weight: 900;
  width: 10vw;
  height: 5vh;
  border: 0px;
  color: AliceBlue;
  display: block;
`;

export {
  FavFormGroup,
  FavFormLabel,
  FavFormInput,
  FavFormMessage,
  FavFormRequiredMessage,
  FavFormButton,
}