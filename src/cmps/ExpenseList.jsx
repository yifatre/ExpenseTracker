import { ExpensePreview } from './ExpensePreview'

export function ExpenseList({ expenses }) {
    return <div>
        {expenses?.map(expense => <ExpensePreview expense={expense} key={expense._id}/>)}
    </div>
}