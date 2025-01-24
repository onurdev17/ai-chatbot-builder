import Image from "next/image";
import logoimg from "../../public/logo.png";

function Logo() {
  return <Image src={logoimg} alt="logo" fill />;
}

export default Logo;
