import { useEffect, useRef, useState } from 'react'
import { utilService } from '../services/util.service'
import { expenseService } from '../services/expense.service.local'

export function ExpenseFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
        console.log('filterByToEdit', filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        if (type === 'date') value = new Date(value).valueOf()
        setFilterByToEdit({ ...filterByToEdit, [field]: value })
    }

    return <div className='expense-filter flex align-center'>
        <label htmlFor="category">Category:
            <select name="category" id="category" onChange={handleChange} defaultValue={filterByToEdit.category}>
                <option value="" >All</option>
                {expenseService.getCategories().map(category => <option key={category} value={category}>{category}</option>)}
            </select>
        </label>
        <label htmlFor="startDate">From:
            <input type="date" name="startDate" id="startDate" value={utilService.getDateStrForInput(new Date(filterByToEdit.startDate))} onChange={handleChange} />
        </label>
        <label htmlFor="toDate">To:
            <input type="date" name="toDate" id="toDate" value={utilService.getDateStrForInput(new Date(filterByToEdit.toDate))} onChange={handleChange} />
        </label>
    </div>
}