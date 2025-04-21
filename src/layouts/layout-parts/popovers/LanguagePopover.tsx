import { Fragment, useRef, useState } from "react";
import Popover from "@mui/material/Popover";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import styled from "@mui/material/styles/styled";
import { useTranslation } from "react-i18next";

// LANGUAGE OPTIONS
const languageOptions: Record<
  string,
  { icon: string; label: string }
> = {
  en: {
    icon: "/static/flags/usa-round.png",
    label: "English",
  },
  es: {
    icon: "/static/flags/spain-round.png",
    label: "Spanish",
  },
};

// STYLED COMPONENTS
const IconWrapper = styled("div")({
  width: 24,
  height: 24,
  padding: "2px",
  display: "flex",
  "& img": {
    width: "100%",
    borderRadius: "50%",
    objectFit: "cover",
  },
});

export default function LanguagePopover() {
  const { i18n } = useTranslation();
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChangeLanguage = (language: string) => {
    if (languageOptions[language]) {
      i18n.changeLanguage(language);
      setOpen(false);
    }
  };

  const selectedLanguage = languageOptions[i18n.language] || languageOptions.en;

  return (
    <Fragment>
      <IconButton onClick={handleOpen} ref={anchorRef}>
        <IconWrapper>
          <img alt={selectedLanguage.label} src={selectedLanguage.icon} />
        </IconWrapper>
      </IconButton>

      <Popover
        keepMounted
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
        slotProps={{
          paper: {
            sx: {
              width: 110,
              py: 1,
            },
          },
        }}
      >
        {Object.keys(languageOptions).map((language) => (
          <MenuItem key={language} onClick={() => handleChangeLanguage(language)}>
            {languageOptions[language].label}
          </MenuItem>
        ))}
      </Popover>
    </Fragment>
  );
}
