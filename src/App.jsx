import { ExpenseIndex } from './pages/ExpenseIndex'
import { AppHeader } from './cmps/AppHeader'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { ExpenseEdit } from './cmps/ExpenseEdit'
import { loadExpenses } from './store/actions/expense.actions'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Loader } from './cmps/Loader'

export function App() {
    const isLoading = useSelector(storeState => storeState.expenseModule.isLoading)

    useEffect(() => {
        loadExpenses()
    }, [])

    return (
        <>
            <AppHeader />
            <main className='main-layout'>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/expense" element={<ExpenseIndex />} >
                        <Route path="/expense/edit" element={<ExpenseEdit />} />
                        <Route path="/expense/edit/:id" element={<ExpenseEdit />} />
                    </Route>
                </Routes>
            </main>
            {isLoading && <Loader />}
        </>
    )
}