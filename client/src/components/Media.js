import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
import favouriteIcon from '../icons/Favourite.png'
import unfavouriteIcon from '../icons/notFavourite.png'

export default function Media(props) {

    const [isFavourite, setFavourite] = useState(false)
    const [isClicked, setClick] = useState(false)
    const [isSaved, setSaved] = useState(false)

    const favouritePlanet = () => {
        setSaved(true)
        setFavourite(true)
    }

    const saveToDB = () => {
        setSaved(!isSaved)
        setClick(!isClicked)
    }

    const favouriteId = () => props.favouriteId(props.planet._id)

    useEffect(() => {
        if (!isSaved && isFavourite)
            axios.delete(`https://nasapp-react-aviadc31.herokuapp.com/image/${props.planet._id}`)
                .then(res => console.log('image id: ' + res + ' has unfavourited successfully'))
                .catch(err => console.log(err))
        else if (isClicked) axios.post("https://nasapp-react-aviadc31.herokuapp.com/image", props.planet)
    }, [isClicked])

    return (
        <>
            {props.planet.favourite && !isFavourite ? favouritePlanet() :
                <div className={props.isHome || props.isSearch? 'box' : 'fav_card'}>
                    <p> {props.planet.title} </p>
                    <Link to={`/favourite/${props.planet._id}`}>
                        <img src={props.planet.hdurl||'https://images-assets.nasa.gov/image/PIA02210/PIA02210~thumb.jpg'} 
                            onClick={()=>favouriteId()}
                        />
                    </Link>
                    <p></p>
                    {
                        props.isHome ? null :
                        <img id="favoriteIcon"  src={isSaved ? `${favouriteIcon}` : `${unfavouriteIcon}`}
                             onClick={() => saveToDB()} 
                        />
                    }
                    <p> {props.planet.hideDescription ? null : props.planet.explanation} </p>
                </div>
            }
        </>
    )
}
