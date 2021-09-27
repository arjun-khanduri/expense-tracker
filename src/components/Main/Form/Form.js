import React, { useState, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ExpenseTrackerContext } from '../../../context/context'
import {
    TextField,
    Typography,
    Grid,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem
}
    from '@material-ui/core'
import useStyles from './styles'
import { incomeCategories, expenseCategories } from '../../../constants/categories';
import formatDate from '../../../utils/formatDate';
import { useSpeechContext } from '@speechly/react-client';

const initialState = {
    amount: 1,
    category: '',
    type: '',
    date: formatDate(new Date())
};


const Form = () => {
    const classes = useStyles()
    const [formData, setFormData] = useState(initialState)
    const { addTransaction } = useContext(ExpenseTrackerContext)
    const { segment } = useSpeechContext()

    const selectedType = formData.type === 'Income' ? incomeCategories : expenseCategories

    const createTransaction = () => {
        if (Number.isNaN(Number(formData.amount)) || !formData.date.includes('-') || formData.type === '' || formData.category === '')
            return;
        const transaction = { ...formData, amount: formData.amount, id: uuidv4() }
        addTransaction(transaction)
        setFormData(initialState)
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                    {segment ? (
                        <>
                            {segment.words.map((w) => w.value).join(' ')}
                        </>
                    ) : null
                    }
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        required>
                        <MenuItem>Choose...</MenuItem>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required>
                        {selectedType.map((category) => <MenuItem key={category.type} value={category.type}>{category.type}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField
                    type="number"
                    label="Amount"
                    fullWidth value={formData.amount}
                    InputProps={{ inputProps: { min: 1 } }}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required />
            </Grid>
            <Grid item xs={6}>
                <TextField
                    type="date"
                    label="Date"
                    fullWidth
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: formatDate(e.target.value) })}
                    required />
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>
                Create Transaction
            </Button>
        </Grid>
    )
}

export default Form
