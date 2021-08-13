import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { Card, Button, List, ListItem, ListItemText } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import getArrayVal from '../lib/util'

function DetailCard({ match }) {
    const classes = useStyles()
    const { id } = match.params;
    const [charData, setCharData] = useState({});
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            // get charcater details
            let res = await axios.get(`https://www.breakingbadapi.com/api/characters/${id}`);
            console.log(res.data[0])
            setCharData(res.data[0]);
            // get quotes of that character
            res = await axios.get(`https://www.breakingbadapi.com/api/quotes/${id}`);
            console.log(res.data)
            setQuotes(res.data);
            setLoading(false);
        }
        fetchData()
    }, [id]);

    if (loading) {
        return <Card className={classes.root}>
            <CircularProgress color="secondary" style={{ margin: 'auto' }} />
        </Card>
    }

    return (
        <>
            <Typography component="h1" variant="h4" style={{ textAlign: 'center' }}>Breaking Bad</Typography>
            <Card className={classes.root}>

                <img src={charData.img} alt={charData.name} className={classes.media} />
                <Typography variant="h1" color="textSecondary" className={classes.name}>
                    {charData.name}
                </Typography>
                <div className={classes.list}>
                    <Typography variant="body2" component="p">
                        Date of birth : {charData.birthday}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Occupation : {getArrayVal(charData.occupation || [])}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Status : {charData.status}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Nickname : {charData.nickname}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Actor : {charData.actor}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Screen Appearance : Season - {getArrayVal(charData.appearance || [])}
                    </Typography>
                </div>

                <div className={classes.list}>
                    <Typography variant="h5" color="textSecondary">
                        All quotes
                    </Typography>
                    <div className={classes.quote}>
                        {quotes.length > 0 ?
                            quotes.map((quote) => (
                                <List component="nav" aria-label="secondary mailbox folders">
                                    <ListItem button>
                                        <ListItemText primary={`→ ${quote.quote}`} />
                                    </ListItem>
                                </List>
                            ))
                            : 'No quote found'
                        }
                    </div>
                </div>

                <div className={classes.list}>
                    <Link to={{ pathname: '/' }} className={classes.link}>
                        <Button variant="contained">Go Home</Button>
                    </Link>
                </div>
            </Card>
        </>
    )
}

const useStyles = makeStyles({
    root: {
        padding: '40px 0',
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
    },
    media: {
        height: 250,
        margin: 'auto'
    },
    name: {
        textAlign: 'center',
        fontSize: 30,
        margin: '20px 0'
    },
    link: {
        textDecoration: 'none',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '3%'
    },
    list: {
        margin: 'auto',
        maxWidth: 600,
        padding: 10,
        width: '100%',
        textAlign: 'left',
        background: '#F1E9E5'
    }
});

export default DetailCard;
