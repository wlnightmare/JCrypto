import { InputAdornment, styled, TextField } from "@mui/material";
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import SearchIcon from "./SearchIcon";

const InputContainer = styled("div")`
  width: 100%;
  background: #ffffff;
  margin-top: 24px;
  margin-bottom: 24px;
`;
const StyledTextField = styled(TextField)`
  height: 80%;
  width: 100%;
  margin: 0;
  outline: none;
  border: 0;
`;
type Props = {
  setSearchTerm: (value: string) => void;
};

const SearchBar: FC<Props> = ({ setSearchTerm }) => {
  return (
    <>
      <InputContainer>
        <StyledTextField
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          InputProps={{
            style: {
              paddingLeft: 10,
            },

            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          placeholder="search coins..."
        />
      </InputContainer>
    </>
  );
};

export default SearchBar;
