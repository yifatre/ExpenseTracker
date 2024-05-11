import { Link } from 'react-router-dom'

export function HomePage() {
    return <div>
        <h2>
            Welcome to Expense Tracker
        </h2>
        <Link to='/expense'>Go to expenses</Link>
    </div>
}