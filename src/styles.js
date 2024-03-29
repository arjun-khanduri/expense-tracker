import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    desktop: {
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    mobile: {
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    main: {
        [theme.breakpoints.up('sm')]: {
            paddingBottom: '5%',
        },
    },
    last: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(3),
            paddingBottom: '200px',
        },
    },
    grid: {
        '& > *': {
            margin: theme.spacing(2),
        },
    },
}));