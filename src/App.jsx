import { ExpenseIndex } from './pages/ExpenseIndex'
import { AppHeader } from './cmps/AppHeader'
import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { ExpenseEdit } from './cmps/ExpenseEdit'

export function App() {
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
        </>
    )
}