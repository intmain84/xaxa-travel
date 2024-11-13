import { Link } from 'react-router-dom'

function Button({
    disabled = false,
    to = null,
    primary = false,
    secondary = false,
    width = null,
    children: text,
    onClick = null,
}) {
    //TODO disabled style
    const styles = `${primary ? 'bg-light-sky text-white hover:text-white hover:bg-dark-sky' : ''} ${secondary ? 'bg-transparent text-green-500 border border-green-500 hover:text-white hover:bg-green-700 hover:border-green-700' : ''} ${width ? width : ''} flex flex-col h-7 justify-center items-center rounded px-4 no-underline text-center transition-all duration-300`
    if (to) {
        return (
            <Link className={styles} to={to}>
                {text}
            </Link>
        )
    }
    return (
        <button disabled={disabled} className={styles} onClick={onClick}>
            {text}
        </button>
    )
}

export default Button
