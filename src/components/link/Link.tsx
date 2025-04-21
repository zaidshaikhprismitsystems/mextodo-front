import { forwardRef } from "react";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";

interface CustomLinkProps extends Omit<RouterLinkProps, "to"> {
  href: string;
}

const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ href, ...others }, ref) => {
    return <RouterLink ref={ref} to={href} {...others} />;
  }
);

export default CustomLink;
