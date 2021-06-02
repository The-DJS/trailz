import styled from 'styled-components';

const FormGroup = styled.div`
  color: SlateGray;
  display: block;
  width: 80vw;
  margin-bottom: 2.5vh;
`;

const FormLabel = styled.label`
  margin-bottom: 0.5em;
  color: ForestGreen;
  display: block;
`;

const FormInput = styled.input`
  padding: 0.5em;
  color: SlateGray;
  background: AliceBlue;
  border: none;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 0.5em;
  &:invalid {
    border: 2px solid red;
  }
`;

const FormTextarea = styled.textarea`
  padding: 0.5em;
  color: LightSlateGray;
  background: AliceBlue;
  border: none;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 0.5em;
  &:invalid {
    border: 2px solid red;
  }
`;

const FormOption = styled.option`
  padding: 0.5em;
  color: LightSlateGray;
  background: AliceBlue;
  border: none;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 0.5em;
`;

const FormSelect = styled.select`
  padding: 0.5em;
  color: SlateGray;
  background: AliceBlue;
  border: none;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 0.5em;
  &:invalid {
    border: 2px solid red;
  }
`;

const FormMessage = styled.label`
  margin-bottom: 0.5em;
  background: AliceBlue;
  width: 100%;
  color: SlateGray;
  display: block;
`;

const FormRequiredMessage = styled.label`
  margin-bottom: 0.5em;
  margin-top:0.5rem;
  width: 100%;
  font-weight: bold;
  color: red;
  display: block;
`;

const FormButton = styled.button`
  margin-bottom: 0.5em;
  margin-top:0.5rem;
  background-color: ForestGreen;
  font-weight: bolder;
  width: 10vw;
  height: 5vh;
  border: 0px;
  color: AliceBlue;
  display: block;
`;

export {
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  FormOption,
  FormSelect,
  FormMessage,
  FormRequiredMessage,
  FormButton,
}