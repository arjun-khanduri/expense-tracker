const incomeColors = ['#165f40', '#0bc77e'];
const expenseColors = ['#043067', '#66196b', '#71fecc', '#f6a6ae', '#fe5dc1'];

export const incomeCategories = [
    { type: 'Salary', amount: 0, color: incomeColors[0] },
    { type: 'Miscellaneous', amount: 0, color: incomeColors[1] },
];

export const expenseCategories = [
    { type: 'Stationary', amount: 0, color: expenseColors[0] },
    { type: 'Food & Groceries', amount: 0, color: expenseColors[1] },
    { type: 'Medical', amount: 0, color: expenseColors[2] },
    { type: 'Travelling', amount: 0, color: expenseColors[3] },
    { type: 'Miscellaneous', amount: 0, color: expenseColors[4] },

];

export const resetCategories = () => {
    incomeCategories.forEach((category) => category.amount = 0);
    expenseCategories.forEach((category) => category.amount = 0);
};