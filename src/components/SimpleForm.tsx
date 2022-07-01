import { Button, styled, TextField } from "@mui/material";
import React, { FC, useState } from "react";

type FormProps = {
  title: string;
  handleClick: (email: string, password: string) => void;
};
const FormWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const SimpleForm: FC<FormProps> = ({ title, handleClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <FormWrapper>
      <TextField
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        size="small"
        label="email"
        placeholder="Enter email"
        required
      />
      <TextField
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        size="small"
        label="password"
        placeholder="Enter password"
        required
      />
      <Button variant="outlined" onClick={() => handleClick(email, password)}>
        {title}
      </Button>
    </FormWrapper>
  );
};
