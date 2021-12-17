import React, { useReducer, createContext } from 'react'
import contextReducer from './contextReducer'
const initialState = JSON.parse(localStorage.getItem('transactions')) || []

export const ExpenseTrackerContext = createContext(initialState)


export const Provider = ({ children }) => {
    const [transactions, dispatch] = useReducer(contextReducer, initialState)

    const balance = transactions.reduce((acc, curVal) => curVal.type === 'Expense' ? (parseInt(acc) - parseInt(curVal.amount)) : (parseInt(acc) + parseInt(curVal.amount)), 0)

    const deleteTransaction = (id) => dispatch({ type: 'DELETE_TRANSACTION', payload: id })
    const addTransaction = (transaction) => dispatch({ type: 'ADD_TRANSACTION', payload: transaction })

    return (
        <ExpenseTrackerContext.Provider value={{
            deleteTransaction,
            addTransaction,
            transactions,
            balance
        }}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}