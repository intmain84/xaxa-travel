import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className="mb-6 mt-5 text-center">
            <Link
                to={'https://lexaxa.com/'}
                className="text-light-blue hover:text-toxic-green transition-all duration-300"
            >
                Made by Alex Yudin
            </Link>
        </div>
    )
}

export default Footer
