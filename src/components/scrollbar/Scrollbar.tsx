import { ReactNode } from "react";
import { SxProps } from "@mui/system";
import { StyledScrollBar } from "./styles";

interface ScrollbarProps {
  children: ReactNode;
  sx?: SxProps;
  [key: string]: any; // Allows additional props
}

export default function Scrollbar({ children, sx, ...props }: ScrollbarProps) {
  return (
    <StyledScrollBar sx={sx} {...props}>
      {children}
    </StyledScrollBar>
  );
}
