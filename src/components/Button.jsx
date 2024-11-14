import { Link } from 'react-router-dom'

const primaryBtn = 'bg-light-sky text-white hover:text-white hover:bg-dark-sky'
const secondaryBtn =
    'bg-transparent text-light-green border border-light-green hover:text-white hover:bg-dark-green hover:border-dark-green'
const generalStyles =
    'flex flex-col h-7 justify-center items-center rounded px-4 no-underline text-center transition-all duration-300'
const dangerBtn =
    'bg-transparent text-light-red border border-light-red hover:text-white hover:bg-light-red hover:border-light-red'

function Button({
    children,
    disabled = null,
    danger = null,
    to = null,
    primary = null,
    secondary = false,
    width = 'w-full',
    onClick = null,
}) {
    //TODO disabled style
    const styles = `${danger ? dangerBtn : ''} ${primary ? primaryBtn : ''} ${secondary ? secondaryBtn : ''} ${width} ${generalStyles}`
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
