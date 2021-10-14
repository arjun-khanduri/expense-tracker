import React, { useState, useEffect, useContext } from 'react'
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
import Snackbar from '../../Snackbar/Snackbar';

const initialState = {
    amount: 1,
    category: '',
    type: '',
    date: formatDate(new Date())
};


const Form = () => {
    const classes = useStyles()
    const [formData, setFormData] = useState(initialState)
    const [open, setOpen] = useState(false);
    const { addTransaction } = useContext(ExpenseTrackerContext)
    const { segment } = useSpeechContext()

    const selectedType = formData.type === 'Income' ? incomeCategories : expenseCategories

    useEffect(() => {
        if (segment) {
            const intent = segment.intent.intent
            if (intent === 'add_income')
                setFormData({ ...formData, type: 'Income' })
            else if (intent === 'add_expense')
                setFormData({ ...formData, type: 'Expense' })
            else if (segment.isFinal && intent === 'create_transaction')
                return createTransaction()
            else if (segment.isFinal && intent === 'cancel_transaction')
                return setFormData(initialState)

            segment.entities.forEach((e) => {
                const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`
                const type = e.type
                if (type === 'category') {
                    if (incomeCategories.map((ic) => ic.type).includes(category)) {
                        setFormData({ ...formData, type: 'Income', category })
                    }
                    else if (expenseCategories.map((ec) => ec.type).includes(category)) {
                        setFormData({ ...formData, type: 'Expense', category })
                    }
                }
                else if (type === 'amount')
                    setFormData({ ...formData, amount: e.value })
                else if (type === 'date')
                    setFormData({ ...formData, date: e.value })
            })

            if(segment.isFinal && formData.type && formData.category && formData.date && formData.amount)
                return createTransaction()
        }
        //eslint-disable-next-line
    }, [segment])

    const createTransaction = () => {
        if (Number.isNaN(Number(formData.amount)) || !formData.date.includes('-') || formData.type === '' || formData.category === '')
            return;
        const transaction = { ...formData, amount: formData.amount, id: uuidv4() }
        setOpen(true)
        addTransaction(transaction)
        setFormData(initialState)
    }

    return (
        <Grid container spacing={2}>
            <Snackbar open={open} setOpen={setOpen} />
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                    {segment && segment.words.map((w) => w.value).join(' ')}
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
            <Button className={classes.button} variant="contained" color="primary" fullWidth onClick={createTransaction}>
                Create Transaction
            </Button>
        </Grid>
    )
}

export default Form
