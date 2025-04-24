import { Link } from 'react-router-dom'

const primaryBtn = 'bg-black text-white hover:text-white hover:bg-gray-700'
const secondaryBtn =
    'bg-transparent text-light-green border border-light-green hover:text-white hover:bg-dark-green hover:border-dark-green'
const generalStyles =
    'flex inline-flex justify-center items-center h-10 px-4 no-underline text-center transition-all duration-300 uppercase'
const dangerBtn =
    'bg-transparent text-light-red border border-light-red hover:text-white hover:bg-light-red hover:border-light-red'

function Button({
    children,
    disabled = null,
    danger = '',
    to = null,
    primary = '',
    secondary = '',
    width = '',
    onClick = null,
}) {
    //TODO disabled style
    const styles = `${danger ? dangerBtn : ''} ${primary ? primaryBtn : ''} ${secondary ? secondaryBtn : ''} ${width} ${generalStyles}  b`
    if (to) {
        return (
            <Link className={styles} to={to}>
                {children}
            </Link>
        )
    }
    return (
        <button disabled={disabled} className={styles} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button
