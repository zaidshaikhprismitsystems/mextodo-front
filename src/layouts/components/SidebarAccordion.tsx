import { Fragment, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';

import { useTranslation } from 'react-i18next';

import { ItemText, ICON_STYLE, BulletIcon, AccordionButton, ChevronRightStyled, AccordionExpandPanel } from '../mainLayout/styles/index';

export default function SidebarAccordion(props: any) {
  
  const { item, children, sidebarCompact } = props;
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const [hasActive, setHasActive] = useState(0);
  const [collapsed, setCollapsed] = useState(false);

  const handleClick = () => setCollapsed(state => !state);

  const find = item?.children?.find((li: any) => li.path === pathname);
  
  useEffect(() => {
    if (find) {
      setCollapsed(true);
      setHasActive(1);
    }
    return () => {
      setCollapsed(false);
      setHasActive(0);
    };
  }, [find]);

  return (
    <Fragment>
      {/* @ts-ignore */}
      <AccordionButton onClick={handleClick} active={sidebarCompact && hasActive}>
        <Box pl="7px" display="flex" alignItems="center">
          {
          /* ICON SHOW IF EXIST */
        }
          {item.icon ? <item.icon sx={ICON_STYLE(hasActive)} /> : null}

          {
          /* BULLET ICON SHOW IF ANY TEXT EXIST  */
        }
        {/* @ts-ignore */}
          {item.iconText ? <BulletIcon active={hasActive} /> : null}

          <ItemText compact={sidebarCompact} active={hasActive}>
            {t(item.name)}
          </ItemText>
        </Box>

        <ChevronRightStyled active={hasActive} compact={sidebarCompact} className="accordionArrow" collapsed={collapsed ? 1 : 0} />
      </AccordionButton>

      {!sidebarCompact ? <Collapse in={collapsed} unmountOnExit>
          <AccordionExpandPanel className="expand">{children}</AccordionExpandPanel>
        </Collapse> : null}
    </Fragment>
  )
}