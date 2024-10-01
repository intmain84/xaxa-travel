import { Link } from "react-router-dom";

function Button({ to = null, primary = false, secondary = false, width = null, children: text }) {
  const styles =
    `${primary && 'bg-green-500 text-white hover:text-white hover:bg-green-700'} ${secondary && 'bg-transparent text-green-500 border border-green-500 hover:text-white hover:bg-green-700 hover:border-green-700'} ${width} flex flex-col h-7 justify-center rounded px-4 no-underline text-center transition-all duration-300`;
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
