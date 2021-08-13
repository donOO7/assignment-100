import { Box, Typography, makeStyles } from "@material-ui/core"
import axios from "axios"
import { useState, useEffect } from "react"
import Cards from "./Cards"
import { Link } from "react-router-dom"

const useStyle = makeStyles({
    headerContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    searchInput: {
        width: '50%',
        height: '7vh',
        fontSize: '1.5em',
        color: 'white',
        backgroundColor: '#7F7F7F',  
        '&:hover':{
            boxShadow:'0px 0px 6px 0px gray'
        }
    },
    cardsContainer: {
        display:'flex',  
        justifyContent:'space-around', 
        flexWrap:'wrap',
        overflow:'wrap',
        alignItems:'center',   
    }
})

const Header = () => {
    const [search, setSearch] = useState('')
    const [cards, setCards] = useState([])
    useEffect(() => {
        axios.get(`https://www.breakingbadapi.com/api/characters?name=${search}`)
            .then(res => {
                setCards(res.data)
            })
            .catch(err => {
                console.log(`Error=>${err}`)
            })
    }, [])

    const filteredCards=cards.filter(card=>
        card.name.toLowerCase().includes(search.toLowerCase())
    )

    const classes = useStyle()
    return (
        <>
            <Box className={classes.headerContainer}>
                <Typography component="h1" variant="h4" style={{ textAlign: 'center' }}>Breaking Bad</Typography>
                <input type="text" placeholder="Ex: Walter White" className={classes.searchInput} onChange={(event) => { setSearch(event.target.value) }}></input>
            </Box>
            <Box className={classes.cardsContainer}>
                {
                    filteredCards.map(card => {
                        return (     
                            <Cards
                                id={card.id}
                                name={card.name}
                                image={card.img}
                                dob={card.birthday}
                                occupation={card.occupation}
                                status={card.status}
                                nickname={card.nickname}
                                actor={card.portrayed}
                                appearance={card.appearance}
                            />
                        )
                    })
                }
            </Box>
        </>
    )
}

export default Header