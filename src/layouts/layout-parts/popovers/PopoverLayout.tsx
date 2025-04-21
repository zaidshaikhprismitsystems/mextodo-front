import React, { ReactNode } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";
import { H4 } from "../../../components/typography";

export default function PopoverLayout({
  title = "Notifications",
  children,
  minWidth = 250,
  maxWidth = 375,
  anchorRef,
  popoverOpen,
  popoverClose,
  hiddenViewButton = false,
}: any) {
  return (
    <Popover
      open={popoverOpen}
      onClose={popoverClose}
      anchorEl={anchorRef.current}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      slotProps={{
        paper: {
          sx: {
            width: "100%",
            padding: "0.5rem 0",
            minWidth,
            maxWidth,
          },
        },
      }}
    >
      <H4 fontSize={16} fontWeight="500" p={2} pt={1.5}>
        {title}
      </H4>
      <Divider />

      {children}

      {!hiddenViewButton && (
        <Box p={1} pb={0.5}>
          <Button variant="text" fullWidth disableRipple>
            View all Notifications
          </Button>
        </Box>
      )}
    </Popover>
  );
}
