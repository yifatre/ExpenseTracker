import { useOutletContext, useParams } from 'react-router-dom'
import { expenseService } from '../services/expense.service'
import { useEffect, useState } from 'react'

export function ExpenseEdit() {
    const { id } = useParams()
    const [expenseToEdit, setExpenseToEdit] = useState(expenseService.getEmptyExpense())
    const [onSave] = useOutletContext()

    useEffect(() => {

        if (id) {
            const f = async () => {
                try {
                    const _expense = await expenseService.getById(id)
                    setExpenseToEdit(_expense)
                }
                catch (err) {
                    console.error(err)
                }
            }
            f()
        }
    }, [])

    // useEffect(() => {
    //     console.log('expenseToEdit', expenseToEdit)
    // }, [expenseToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target

        if (type === 'number') value = +value
        if (type === 'date') value = new Date(value).valueOf()

        setExpenseToEdit({ ...expenseToEdit, [field]: value })
    }

    return <div className='expense-edit'>
        <form onSubmit={(ev) => { ev.preventDefault(); onSave(expenseToEdit) }}>
            <select name="category" id="category" onChange={handleChange} defaultValue={expenseToEdit.category ? expenseToEdit.category : 'DEFAULT'}>
                <option value="DEFAULT" disabled >Category</option>
                {expenseService.getCategories().map(category => <option key={category} value={category}>{category}</option>)}
            </select>
            <label htmlFor="amount">
                Amount:
                <input type="number" name="amount" id="amount" onChange={handleChange} value={expenseToEdit.amount} />
            </label>
            <label htmlFor="date">
                Date:
                <input type="date" name="date" id="date" onChange={handleChange} value={expenseToEdit.date ? new Date(expenseToEdit.date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10)} />
            </label>
            <label htmlFor="notes">
                Notes:
                <input type="text" name='notes' id='notes' onChange={handleChange} value={expenseToEdit.notes} />
            </label>
            <button>Save</button>
        </form>
    </div>
}