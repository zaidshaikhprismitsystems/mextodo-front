import { forwardRef, ReactNode } from "react";
// STYLED COMPONENT
import { Wrapper } from "./styles";

interface WrapperProps extends React.HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

// Forwarding ref with proper typing
const WrapperComponent = forwardRef<HTMLElement, WrapperProps>(({ children, ...props }, ref) => (
  <Wrapper ref={ref} {...props}>{children}</Wrapper>
));

export default WrapperComponent;
