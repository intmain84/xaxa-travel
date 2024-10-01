import { Link } from "react-router-dom";
import Logo from "./Logo";

function Header() {
  return (
    <header className="mb-8 flex justify-center text-xl">
      <Link to="/" className="block w-[200px]"><Logo/></Link>
    </header>
  );
}

export default Header;
