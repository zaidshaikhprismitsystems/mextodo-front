import { Suspense } from 'react';
import { LoadingProgress } from '../components/loader';

const Loadable = (Component: any) => (props: any) => {
  return <Suspense fallback={<LoadingProgress />}>
      <Component {...props} />
    </Suspense>;
};

export default Loadable;