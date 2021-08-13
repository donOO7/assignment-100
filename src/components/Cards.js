import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import getArrayVal from '../lib/util'

const Cards = ({ id, name, image, dob, occupation, status, nickname, actor, appearance }) => {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardHeader
                title={name}
            />
            <CardMedia
                className={classes.media}
                style={{
                    backgroundSize: 'contain'
                }}
                image={image}
                title={id}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Date of birth : {dob}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Occupation : {getArrayVal(occupation)}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Status : {status}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Nickname : {nickname}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Actor : {actor}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Screen Appearance : Season - {getArrayVal(appearance)}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    Quotes :
                </Typography>
            </CardContent>

            <Link to={{ pathname: `/detail/${id}` }} className={classes.link}>
                <Button variant="contained">View full Info</Button>
            </Link>
        </Card>
    )
}

const useStyles = makeStyles({
    root: {
        width: '30%',
        minWidth: '270px',
        marginTop: '2vh',
        cursor: 'pointer',
        boxShadow: '0px 0px 2px 0px #0d98ba',
        '&:hover': {
            boxShadow: '0px 0px 12px 0px #8B8B8B'
        },
        "@media (max-width:599px)": {
            width: '90%',
        },
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    link: {
        textDecoration: 'none',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '3%'
    }
});

export default Cards;
