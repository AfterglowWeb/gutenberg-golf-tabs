import React from 'react';
import Box from '@mui/material/Box';
import ParallaxMedia from './ParallaxMedia';
import { ParallaxProvider } from 'react-scroll-parallax';

export default function SectionBackground(props) {

    const {background} = props;   
    if (!background) {
        return null;
    }

    if(!background.mediaUrl) {
        return null;
    }

    return(
        <ParallaxProvider>
            {background.isParallax ? <>
                {<ParallaxMedia src={background.mediaUrl} />}
            </>
            :
            <>
                {(background.mediaType === 'image') && 
                <Box className="absolute inset-0 w-full h-full bg-cover bg-center" style={{backgroundImage: `url(${background.mediaUrl})`}} />}
                {(background.mediaType === 'video') && 
                <video autoPlay muted loop playsinline className="absolute inset-0 w-full h-full object-cover">
                    <source src={background.mediaUrl} type="video/mp4" />
                </video>}
            </>}
            <div className="absolute inset-0  w-full h-full  bg-black opacity-30" />
        </ParallaxProvider>
    )

}