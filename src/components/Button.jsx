import { Link } from "react-router-dom";

function Button({ to = null, children: text }) {
  const styles =
    "flex flex-col h-7 rounded bg-green-500 px-4 text-white no-underline";
  if (to) {
    return (
      <Link className={styles} to={to}>
        {text}
      </Link>
    );
  }
  return <button className={styles}>{text}</button>;
}

export default Button;
