import { Fragment, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ButtonBase from "@mui/material/ButtonBase";
import styled from "@mui/material/styles/styled";

import PopoverLayout from "./PopoverLayout";
import FlexBox from "../../../components/flexbox/FlexBox";
import AvatarLoading from "../../../components/avatar-loading";
import { H6, Paragraph, Small } from "../../../components/typography";
import useAuth from "../../../hooks/useAuth"; // Ensure this path is correct
import { useAppDispatch } from "../../../services/store/hooks/hooks";
import { setUserDetails } from "../../../services/store/slices/userSlice";

// Styled Components
const StyledButtonBase = styled(ButtonBase)(({ theme }) => ({
  marginLeft: 8,
  borderRadius: 30,
  border: `1px solid ${theme.palette.grey[200]}`,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledSmall = styled(Paragraph)(({ theme }) => ({
  fontSize: 13,
  display: "block",
  cursor: "pointer",
  padding: "5px 1rem",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function ProfilePopover() {
  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  // const { logout } = useAuth(); // Using authentication hook

  const handleMenuItem = (path: string) => (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    navigate(path);
    setOpen(false);
  };

  const dispatch = useAppDispatch();

  return (
    <Fragment>
      <StyledButtonBase ref={anchorRef} onClick={() => setOpen(true)}>
        <AvatarLoading
          alt="user"
          percentage={60}
          src="/public/user.png"
          // sx={{ width: 35, height: 35 }}
        />
      </StyledButtonBase>

      <PopoverLayout
        hiddenViewButton
        maxWidth={230}
        minWidth={200}
        popoverOpen={open}
        anchorRef={anchorRef}
        popoverClose={() => setOpen(false)}
        title={
          <FlexBox alignItems="center" gap={1}>
            <Avatar src="/public/user.png" sx={{ width: 35, height: 35 }} />
            <div>
              <H6 fontSize={14}>Aaron Cooper</H6>
              <Small color="text.secondary" display="block">
                aaron@example.com
              </Small>
            </div>
          </FlexBox>
        }
      >
        <Box pt={1}>
          <StyledSmall onClick={handleMenuItem("/dashboard/profile")}>Set Status</StyledSmall>
          <StyledSmall onClick={handleMenuItem("/dashboard/profile")}>Profile & Account</StyledSmall>
          <StyledSmall onClick={handleMenuItem("/dashboard/account")}>Settings</StyledSmall>
          <StyledSmall onClick={handleMenuItem("/dashboard/profile")}>Manage Team</StyledSmall>

          <Divider sx={{ my: 1 }} />

          <StyledSmall onClick={() => {localStorage.removeItem("authToken"); dispatch(setUserDetails(null)); navigate("/adminlogin")}}>Sign Out</StyledSmall>
        </Box>
      </PopoverLayout>
    </Fragment>
  );
}
