import { Fragment, useRef, useState } from "react";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import PopoverLayout from "./PopoverLayout";
import FlexBox from "../../../components/flexbox/FlexBox";
import { Paragraph, Small } from "../../../components/typography";
import Apps from "../../../icons/duotone/Apps";

// Define Service Type
interface Service {
  id: number;
  title: string;
  body: string;
  image: string;
}

// Service Data
const SERVICES: Service[] = [
  {
    id: 1,
    title: "Slack",
    body: "Email collaboration software",
    image: "/static/connect-accounts/slack.svg",
  },
  {
    id: 2,
    title: "Github",
    body: "Email collaboration software",
    image: "/static/connect-accounts/github.svg",
  },
  {
    id: 3,
    title: "Stack Overflow",
    body: "Email collaboration software",
    image: "/static/connect-accounts/stack-overflow.svg",
  },
];

export default function ServicePopover() {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Fragment>
      <IconButton ref={anchorRef} onClick={() => setOpen(true)}>
        <Badge color="error" badgeContent={0}>
          <Apps sx={{ color: "grey.400", fontSize: 18 }} />
        </Badge>
      </IconButton>

      <PopoverLayout
        hiddenViewButton
        popoverOpen={open}
        anchorRef={anchorRef}
        title="Web apps & services"
        popoverClose={() => setOpen(false)}
      >
        {SERVICES.map((service) => (
          <ListItem key={service.id} body={service.body} image={service.image} title={service.title} />
        ))}
      </PopoverLayout>
    </Fragment>
  );
}

// -------------------------------------------------------------------------------------

// ListItem Props Type
interface ListItemProps {
  body: string;
  image: string;
  title: string;
}

function ListItem({ body, image, title }: ListItemProps) {
  return (
    <FlexBox
      p={2}
      gap={2}
      alignItems="center"
      sx={{
        cursor: "pointer",
        "&:hover": { backgroundColor: "action.hover" },
      }}
    >
      <Avatar src={image} sx={{ width: 35, height: 35 }} />
      <div>
        <Paragraph fontWeight={500}>{title}</Paragraph>
        <Small display="block" color="text.secondary">
          {body}
        </Small>
      </div>
    </FlexBox>
  );
}
