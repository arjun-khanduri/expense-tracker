import { useContext } from 'React'
import { ExpenseTrackerContext } from './context/context'
import { incomeCategories, expenseCategories, resetCategories } from './constants/categories'

const useTransactions = (title) => {
    resetCategories();
    const { transactions } = useContext(ExpenseTrackerContext)
    const transactionType = transactions.filter(transaction => transaction.type === title)
    const total = transactions.reduce((sum, transaction) => sum += transaction.amount)
    const categories = title === 'Income' ? incomeCategories : expenseCategories

    console.log({ transactionType, total, categories })

    transactionType.forEach((transaction) => {
        const category = categories.find((category) => category.type === transaction.category)
        if (category)
            category.amount += transaction.amount
    })

    const filteredCategories = categories.filter((category) => category.amount > 0)

    const chartData = {
        datasets: [{
            data: filteredCategories.map((category) => category.amount),
            backgroundColor: filteredCategories.map((category) => category.color)
        }],
        labels: filteredCategories.map((category) => category.type)
    }

    return { chartData }
}

export default useTransactions