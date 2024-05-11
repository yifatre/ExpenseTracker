import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import { expenseService } from '../services/expense.service'
import { useEffect, useState } from 'react'
import { utilService } from '../services/util.service'
import { useSelector } from 'react-redux'

export function ExpenseEdit() {
    const { id } = useParams()
    // const expenseToEdit = useSelector(storeState => storeState.expenseModule.expenses.find(ex => ex._id === id))
    const [expenseToEdit, setExpenseToEdit] = useState(expenseService.getEmptyExpense())
    const [onSave, expenses] = useOutletContext()
    const navigate = useNavigate()

    useEffect(() => {
        // logg
        if (id) {
            setExpenseToEdit(expenses.find(ex => ex._id === id))
        }
    }, [])

    useEffect(() => {
        console.log('expenseToEdit', expenseToEdit)
    }, [expenseToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target

        if (type === 'number') value = +value
        if (type === 'date') value = new Date(value).valueOf()

        setExpenseToEdit({ ...expenseToEdit, [field]: value })
    }

    function onCloseEdit() {
        navigate('/expense')
    }

    function onBackdropClick(ev) {
        ev.stopPropagation()
        if (ev.target.className === 'expense-edit-backdrop') onCloseEdit()
    }

    return <div className='expense-edit-backdrop' onClick={onBackdropClick}>
        <div className='expense-edit'>
            <button className='close-btn' onClick={onCloseEdit}>✕</button>
            <h2>{id ? 'Edit expense' : 'Add an expense'}</h2>
            <form className='' onSubmit={(ev) => { ev.preventDefault(); onSave(expenseToEdit) }}>
                <select name="category" id="category" onChange={handleChange} defaultValue={expenseToEdit.category ? expenseToEdit.category?.toLowerCase() : 'DEFAULT'}>
                    <option value="DEFAULT" disabled>Category</option>
                    {expenseService.getCategories().map(category => <option key={category} value={category.toLowerCase()} selected={category.toLowerCase() === expenseToEdit.category.toLowerCase()}>{category}</option>)}
                </select>
                <label htmlFor="amount">
                    Amount:
                </label>
                <input type="number" name="amount" id="amount" onChange={handleChange} value={expenseToEdit.amount} />
                <label htmlFor="date">
                    Date:
                </label>
                <input type="date" name="date" id="date" onChange={handleChange} value={expenseToEdit.date ? utilService.getDateStrForInput(new Date(expenseToEdit.date)) : utilService.getDateStrForInput(new Date())} />
                <label htmlFor="notes">
                    Notes:
                </label>
                <input type="text" name='notes' id='notes' onChange={handleChange} value={expenseToEdit.notes} />
                <button>Save</button>
            </form>
        </div>
    </div>
}