import React from 'react'
import Details from './components/Details/Details';
import Main from './components/Main/Main';
import { Grid } from '@material-ui/core';
import useStyes from './styles';
import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel } from '@speechly/react-ui';

const App = () => {
    const classes = useStyes();
    return (
        <div>
            <Grid
                className={classes.grid}
                container
                spacing={0}
                alignItems="center"
                justify="center"
                style={{ height: '100vh' }}>
                <Grid item xs={12} sm={4} className={classes.mobile}>
                    <Details title="Income" />
                </Grid>
                <Grid item xs={12} sm={3} className={classes.main}>
                    <Main />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Details title="Income" className={classes.desktop} />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Details title="Expense" className={classes.last} />
                </Grid>
            </Grid>
            <PushToTalkButtonContainer>
                <PushToTalkButton />
                <ErrorPanel />
            </PushToTalkButtonContainer>
        </div>
    )
}

export default App