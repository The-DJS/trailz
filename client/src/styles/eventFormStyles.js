import styled from 'styled-components';

const EventFormGroup = styled.div`
  color: SlateGray;
  display: block;
  width: 80vw;
  margin-bottom: 2.5vh;
  margin-left: 2vw;
  margin-right: 2vw;
`;

const EventFormLabel = styled.label`
  margin-bottom: 0.5em;
  font-weight: bold;
  color: ForestGreen;
  display: block;
`;

const EventFormInput = styled.input`
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

const EventFormTextarea = styled.textarea`
  padding: 0.5em;
  color: LightSlateGray;
  background: AliceBlue;
  border: none;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 0.5em;
  white-space: pre-wrap;
  resize: vertical;
  &:invalid {
    border: 2px solid red;
  }
`;

const EventFormOption = styled.option`
  padding: 0.5em;
  color: LightSlateGray;
  background: AliceBlue;
  border: none;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 0.5em;
`;

const EventFormSelect = styled.select`
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

const EventFormMessage = styled.label`
  margin-bottom: 0.5em;
  background: AliceBlue;
  width: 100%;
  color: SlateGray;
  display: block;
`;

const EventFormRequiredMessage = styled.label`
  margin-bottom: 0.5em;
  margin-top:0.5rem;
  width: 100%;
  font-weight: bold;
  color: red;
  display: block;
`;

const EventFormButton = styled.button`
  margin-bottom: 0.5em;
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
  EventFormGroup,
  EventFormLabel,
  EventFormInput,
  EventFormTextarea,
  EventFormOption,
  EventFormSelect,
  EventFormMessage,
  EventFormRequiredMessage,
  EventFormButton,
}