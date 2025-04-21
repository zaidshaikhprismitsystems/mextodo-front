import { Fragment, useContext, useState } from 'react'; // MUI

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import useMediaQuery from '@mui/material/useMediaQuery';
import ClickAwayListener from '@mui/material/ClickAwayListener'; // SITE SETTINGS CONTEXT FILE

// import { SettingsContext } from '@/contexts/settingsContext'; // CUSTOM ICON COMPONENTS

import Menu from '../../icons/Menu';
import MenuLeft from '../../icons/MenuLeft';
import ThemeIcon from '../../icons/ThemeIcon';
import Search from '../../icons/duotone/Search';
import MenuLeftRight from '../../icons/MenuLeftRight'; // LAYOUT BASED HOOK

// import useLayout from '@/layouts/layout-1/context/useLayout'; // CUSTOM COMPONENTS

import SearchBar from '../../layouts/layout-parts/SearchBar';
import ProfilePopover from '../layout-parts/popovers/ProfilePopover';
import ServicePopover from '../layout-parts/popovers/ServicePopover';
import LanguagePopover from '../layout-parts/popovers/LanguagePopover';
import NotificationsPopover from '../layout-parts/popovers/NotificationsPopover'; // STYLED COMPONENTS

import { DashboardHeaderRoot, StyledToolBar } from '../../layouts/mainLayout/styles';

import AdminDrower from '../adminLayout/AdminDrower';

export default function DashboardHeader() {
  // const {
  //   handleOpenMobileSidebar
  // } = useLayout();
  const [openSearchBar, setSearchBar] = useState(false);

  // const {
  //   settings,
  //   saveSettings
  // } = useContext(SettingsContext);

  const upSm = useMediaQuery(theme => theme.breakpoints.up('sm'));
  const downMd = useMediaQuery(theme => theme.breakpoints.down(1200));

  // const handleChangeDirection = value => {
  //   saveSettings({ ...settings,
  //     direction: value
  //   });
  // };

  // const handleChangeTheme = value => {
  //   saveSettings({ ...settings,
  //     theme: value
  //   });
  // };

  return <DashboardHeaderRoot position="sticky" sx={{mb:2, borderBottom: '1px dashed rgb(229, 231, 235)'}}>
      <StyledToolBar>
        <AdminDrower />
        {
        /* SMALL DEVICE SIDE BAR OPEN BUTTON */
      }
        {/* {downMd && <IconButton onClick={handleOpenMobileSidebar}>
            <Menu />
          </IconButton>} */}

        {
        /* SEARCH ICON BUTTON */
      }
        <ClickAwayListener onClickAway={() => setSearchBar(false)}>
          <div>
            {!openSearchBar ? <IconButton onClick={() => setSearchBar(true)}>
                <Search sx={{
              color: 'grey.400',
              fontSize: 18
            }} />
              </IconButton> : null}

            <SearchBar open={openSearchBar} handleClose={() => setSearchBar(false)} />
          </div>
        </ClickAwayListener>

        <Box flexGrow={1} ml={1} />

        {
        /* TEXT DIRECTION SWITCH BUTTON */
      }
        {/* {settings.direction === 'rtl' ? <IconButton onClick={() => handleChangeDirection('ltr')}>
            <MenuLeft sx={{
          color: 'grey.400'
        }} />
          </IconButton> : <IconButton onClick={() => handleChangeDirection('rtl')}>
            <MenuLeftRight sx={{
          color: 'grey.400'
        }} />
          </IconButton>} */}

        {
        /* THEME SWITCH BUTTON */
      }
        <IconButton onClick={() => {}}>
          <ThemeIcon />
        </IconButton>

        {upSm && <Fragment>
            <LanguagePopover />
            <NotificationsPopover />
            <ServicePopover />
          </Fragment>}

        <ProfilePopover />
      </StyledToolBar>
    </DashboardHeaderRoot>;
}