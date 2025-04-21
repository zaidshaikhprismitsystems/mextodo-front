import { Fragment } from 'react';
import Card from '@mui/material/Card'; // CUSTOM COMPONENTS

import InfoForm from './info-form';
import UserInfo from './user-info'; // STYLED COMPONENTS

import { CoverPicWrapper } from './styles';
export default function BasicInformation() {
  return <Fragment>
      {/* <Card sx={{
        padding: 3,
        position: 'relative'
      }}>
        <CoverPicWrapper>
          <img width="100%" height="100%" alt="Team Member" src="/static/cover/user-cover-pic.png" />
        </CoverPicWrapper>

        {
      }
        <UserInfo />
      </Card> */}
        <InfoForm />
    </Fragment>;
}