import React from 'react'
import {
    List as MUIList,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    ListItemSecondaryAction,
    IconButton,
    Slide
}
    from '@material-ui/core'
import { Delete, MoneyOff } from '@material-ui/icons'
import useStyles from './styles'

const List = () => {
    const classes = useStyles()
    const transactions: any = [
        { id: 1, type: 'Income', category: 'Business', amount: 100, date: new Date() },
        { id: 2, type: 'Expense', category: 'Domestic', amount: 100, date: new Date() },
        { id: 3, type: 'Expense', category: 'Travelling', amount: 100, date: new Date() }
    ]
    return (
        <MUIList dense={false} className={classes.list}>
            {transactions.map((transaction: any) => (
                <Slide direction="down" in mountOnEnter unmountOnExit key={transaction.id} >
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={transaction.type === 'Income' ? classes.avatarIncome : classes.avatarExpense}>
                                <MoneyOff />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={transaction.category} secondary={`INR ${transaction.amount} - ${transaction.date}`} />
                        <ListItemSecondaryAction>
                            <IconButton edge='end' aria-label='delete'>
                                <Delete />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                </Slide>
            ))}
        </MUIList >
    )
}

export default List
