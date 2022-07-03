import { Box, Button, styled } from "@mui/material";
import { ModeType } from "../types";
import { COLORS } from "./color";

export const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 350px;
  background-color: ${COLORS.WHITE};
  border: 2px solid #000;
  box-shadow: 24;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  gap: 20px;
  @media (max-width: 400px) {
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
export const StyledLine = styled("span")`
  text-align: center;
  margin-left: 42px;
`;
export const CustomBox = styled("div")`
  padding: 25px;
`;

export const StyledSubmitButton = styled(Button)<ModeType>`
  display: block;
  margin: 0 auto;
  width: 220px;
  background-color: ${(props) =>
    props.mode ? `${COLORS.HEADER}` : `${COLORS.SECONDARY}`};
`;

export const StyledButton = styled(Button)`
  text-transform: none;
`;
