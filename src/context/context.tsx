import React, { useReducer, createContext } from 'react';

const initialState: any = []

export const ExpenseTrackerContext = createContext(initialState)

export const Provider = ({ children }: { children: any }) => {
    return (
        <ExpenseTrackerContext.Provider value={{ appName: 'Expense Tracker' }}>
            {children}
        </ExpenseTrackerContext.Provider>

    )
}