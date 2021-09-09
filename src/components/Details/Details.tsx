import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';
import useStyes from './styles';

const Details = () => {
    const classes = useStyes();
    return (
        <Card className={classes.income}>
            <CardHeader title="Income" />
            <CardContent>
                <Typography variant="h5">
                    INR 100
                </Typography>
                <Doughnut data="sample" />
            </CardContent>
        </Card>
    )
}

export default Details;
