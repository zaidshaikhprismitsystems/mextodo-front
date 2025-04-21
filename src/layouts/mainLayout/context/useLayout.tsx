import { useContext } from 'react';
import { LayoutContext } from './layoutContext';

const useLayout: any = () => useContext(LayoutContext);

export default useLayout;