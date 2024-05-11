import foodIcon from '../assets/img/food.svg'
import groceriesIcon from '../assets/img/groceries.svg'
import transportIcon from '../assets/img/transportation.svg'
import otherIcon from '../assets/img/other.svg'
import utilitiesIcon from '../assets/img/utilities.svg'
import shoppingIcon from '../assets/img/shopping.svg'
import { utilService } from '../services/util.service'
import { Link } from 'react-router-dom'

export function ExpensePreview({ expense, onDeleteExpense }) {
    const icons = {
        food: foodIcon,
        groceries: groceriesIcon,
        transportation: transportIcon,
        other: otherIcon,
        utilities: utilitiesIcon,
        shopping: shoppingIcon
    }

    return <li className='expense-preview'>
        <img src={icons[expense.category.toLowerCase()]} alt="" />
        <h3 className='category'>{expense.category}</h3>
        <p className='notes'>{expense.notes}</p>
        <p className='amount'>{expense.amount.toFixed(2)}₪</p>
        <p className='date'>{utilService.getFormattedDate(new Date(expense.date))}</p>
        <button className='del-btn' onClick={() => onDeleteExpense(expense._id)}>✕</button>
        <Link className='edit-btn' to={`/expense/edit/${expense._id}`}>✏️</Link>
    </li>
}