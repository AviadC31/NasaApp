import React from 'react'
import Media from './Media'

export default function MediaCard (props) {

    return (
            <>
                {
                    <Media planet={props.planet}
                        isHome={props.isHome? true : false}
                        isSearch={props.isSearch? true : false}
                        favouriteId={props.favouriteId} 
                        id={props.id} />
                }
            </>
    )
}


