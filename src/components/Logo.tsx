import Image from "next/image";
import logoimg from "../../public/logo.png";
import Link from "next/link";

function Logo() {
  return (
    <Link href={"/"}>
      <Image src={logoimg} alt="logo" fill />
    </Link>
  );
}

export default Logo;
