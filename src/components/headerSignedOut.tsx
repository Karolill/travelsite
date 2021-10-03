import { ReactComponent as SVGLogo } from "../resources/logo.svg";
import "../styling/headerStyle.css";

const HeaderSignedOut = () => {
  return (
    <header>
      <SVGLogo />
    </header>
  );
};

export default HeaderSignedOut;
