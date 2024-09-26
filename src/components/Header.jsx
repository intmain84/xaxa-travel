import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex mb-8 text-xl">
      <Link to="/">LOGO</Link>
      <Link to="login">Login</Link>
    </header>
  );
}

export default Header;
