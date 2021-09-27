import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import { Pie } from 'react-chartjs-2';
import useStyes from './styles';
import useTransactions from '../../useTransactions';

const Details = ({ title }) => {
    const classes = useStyes();
    const { total, chartData } = useTransactions(title);
    return (
        <Card className={title === 'Income' ? classes.income : classes.expense}>
            <CardHeader title={title} />
            <CardContent>
                <Typography variant="h5">
                    INR {total}
                </Typography>
                <Pie data={chartData} />
            </CardContent>
        </Card>
    )
}

export default Details;
