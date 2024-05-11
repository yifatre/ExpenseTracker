import { ExpensePreview } from './ExpensePreview'

export function ExpenseList({ expenses, onDeleteExpense }) {
    if (!expenses | !expenses.length) return <div>No matching expenses to show yet</div>
    return <ul className='expense-list clean-list'>
        {expenses?.map(expense => <ExpensePreview key={expense._id} expense={expense} onDeleteExpense={onDeleteExpense} />)}
    </ul>
}