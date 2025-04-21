// STYLED COMPONENT
import { RootStyle } from './styles';
export default function LoaderWithLogo() {
  return <RootStyle className="loading-wrapper">
      <div className="logo">
        <img src="/mextodo-circle.png" alt="mextodo" />
      </div>

      <div className="loading-content"></div>
    </RootStyle>;
}