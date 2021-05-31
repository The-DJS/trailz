import React from 'react';
import styled from 'styled-components';

const FormGroup = styled.div`
  color: palevioletred;
    display: block;
  width: 300px;
  margin: 50px auto;
`;

const Label = styled.label`
margin-bottom: 0.5em;
color: palevioletred;
    display: block;
`;

const Input = styled.input`
  padding: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 0.5em;
`;

const Message = styled.label`
  margin-bottom: 0.5em;
  color: palevioletred;
    display: block;
`;

const Button = styled.button`
margin-bottom: 0.5em;
color: palevioletred;
  display: block;
`;

const message = 'this is the validation message';
const Form = ({ location }) => (
  <div>
    <Form>
      <FormGroup>
        <Label htmlFor="label">Event</Label>
        <Input id="label" />
        <Message>This is the validation message</Message>
      </FormGroup>
      <FormGroup>
        <Label>Location: </Label>
        { location.name }
        <Message>This is the validation message</Message>
      </FormGroup>
      <FormGroup>
        <Button type="submit">Submit</Button>
      </FormGroup>
    </Form>
  </div>
);

export default Form;
