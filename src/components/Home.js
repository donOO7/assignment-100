import { useState, useEffect } from "react"
import axios from "axios"
import { Box, Typography, makeStyles } from "@material-ui/core"
import CircularProgress from '@material-ui/core/CircularProgress';

import Cards from "./Cards"

const Header = () => {
    const [search, setSearch] = useState('')
    const [cards, setCards] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            let { data } = await axios.get(`https://www.breakingbadapi.com/api/characters?name=${search}`);
            setCards(data)
            setLoading(false);
        }
        fetchData()
    }, [search])

    const filteredCards = cards.filter(card =>
        card.name.toLowerCase().includes(search.toLowerCase())
    )

    const classes = useStyle()
    return (
        <>
            <Box className={classes.headerContainer}>
                <Typography component="h1" variant="h4" style={{ textAlign: 'center' }}>Breaking Bad</Typography>
                <input
                    type="text"
                    placeholder="Ex: Walter White"
                    className={classes.searchInput}
                    onChange={(event) => { setSearch(event.target.value) }}
                />
            </Box>
            <Box className={classes.cardsContainer}>
                {loading && <CircularProgress color="secondary" style={{ margin: '30px auto' }} />}
                {filteredCards.map(card => (
                    <Cards
                        key={card.char_id}
                        id={card.char_id}
                        name={card.name}
                        image={card.img}
                        dob={card.birthday}
                        occupation={card.occupation}
                        status={card.status}
                        nickname={card.nickname}
                        actor={card.portrayed}
                        appearance={card.appearance}
                    />
                ))}
            </Box>
        </>
    )
}

const useStyle = makeStyles({
    headerContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchInput: {
        border: '0 #fff;',
        maxWidth: 700,
        width: '90%',
        height: 20,
        borderRadius: 16,
        boxShadow: '2 4px 8px 0 #F2E1C1',
        backgroundColor: '#F2E1C1',
        margin: '10px auto',
        padding: '17px 23px 17px 19px',
        color: '#000',
        fontSize: 16
    },
    cardsContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        overflow: 'wrap',
        alignItems: 'center',
    }
})

export default Header