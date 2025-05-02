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
    const basic = 'flex justify-center items-center font-medium px-5 py-4'
    const variants = {
        primary:
            'bg-primary text-white hover:bg-primary-dark transition-all duration-500',
        secondary:
            'bg-secondary text-white hover:bg-secondary-dark transition-all duration-500',
        ghost: 'bg-transparent hover:bg-gray-100',
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
