import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="mb-8 flex text-xl">
      <Link to="/">LOGO</Link>
      <Link to="login">Login</Link>
    </header>
  );
}

export default Header;
