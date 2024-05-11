import { ExpensePreview } from './ExpensePreview'

export function ExpenseList({ expenses, onDeleteExpense }) {
    return <ul className='expense-list clean-list'>
        {expenses?.map(expense => <ExpensePreview key={expense._id} expense={expense} onDeleteExpense={onDeleteExpense}/>)}
    </ul>
}