import { InputAdornment, styled, TextField } from "@mui/material";
import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import { COLORS } from "../constants/color";
import { useAppSelector } from "../hooks/redux-hooks";
import { ModeType } from "../types";
import SearchIcon from "./SearchIcon";

const InputContainer = styled("div")`
  width: 100%;
  margin-top: 45px;
  margin-bottom: 24px;
`;
const StyledTextField = styled(TextField)<ModeType>`
  height: 80%;
  width: 100%;
  margin: 0;
  outline: none;
  background-color: ${(props) =>
    props.mode ? `${COLORS.MAIN}` : `${COLORS.TITLE}`};
  border: 0;
`;
type Props = {
  setSearchTerm: (value: string) => void;
};

const SearchBar: FC<Props> = ({ setSearchTerm }) => {
  const location = useLocation().pathname;
  const mode = useAppSelector((state) => state.mode.darkmode);

  return (
    <>
      <InputContainer>
        <StyledTextField
          mode={mode}
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
          placeholder={location === "/news" ? "search news" : "search coins"}
        />
      </InputContainer>
    </>
  );
};

export default SearchBar;
