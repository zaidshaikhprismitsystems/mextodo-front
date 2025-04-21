import { Fragment } from 'react';

import InfoForm from './info-form';

export default function Smtp({settings}: any) {
  return <Fragment>
        <InfoForm settings={settings} />
    </Fragment>;
}