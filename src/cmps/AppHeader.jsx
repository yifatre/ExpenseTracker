import { LoginSignUp } from './LoginSignUp'

export function AppHeader() {
    return <header className='flex justify-space-between'>
        <h1>
            Expense Tracker
        </h1>
        <LoginSignUp />
    </header>
}