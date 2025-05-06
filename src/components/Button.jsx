import { Link } from 'react-router-dom'
import clsx from 'clsx'

function Button({
    children,
    href,
    onClick,
    variant = 'primary',
    className = '',
    disabled = false,
    ...rest
}) {
    const basic =
        'flex justify-center items-center font-medium px-5 py-4 transition-all duration-500'
    const variants = {
        primary: 'bg-primary text-white hover:bg-primary-dark',
        secondary: 'bg-secondary text-white hover:bg-secondary-dark',
        danger: 'bg-red-500 text-white hover:bg-red-600',
    }
    const styles = clsx(basic, variants[variant], className)

    if (href) {
        return (
            <Link className={styles} to={href}>
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
