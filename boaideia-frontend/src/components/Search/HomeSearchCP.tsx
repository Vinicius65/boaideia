import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export default function HomeSearchCP({ filter }: { filter: (query: string) => void }) {
    const classes = useStyles()
    const handlSearch = (evt: any) => {
        evt.preventDefault();
    }
    const [query, setQuery] = useState('');

    useEffect(() => {
        filter(query);
        console.log(query);

    }, [query])


    return (
        <Paper component="form" className={classes.root}>

            <InputBase
                className={classes.input}
                placeholder="Search Projects"
                inputProps={{ 'aria-label': 'search google maps' }}
                value={query}
                onChange={(value) => setQuery(value.target.value)}
            />
            <IconButton type="submit" onClick={handlSearch} className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper >
    );
}
