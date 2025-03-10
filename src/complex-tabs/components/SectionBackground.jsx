import React from 'react';
import Box from '@mui/material/Box';
import ParallaxMedia from './ParallaxMedia';

export default function SectionBackground(props) {
    
    const {background} = props;   
    if (!background) {
        return null;
    }

    return(
        <>
            {background.isParallax ? <>
                {background.mediaUrl && <ParallaxMedia src={background.mediaUrl} />}
            </>
            :
            <>
                {background.mediaUrl && <Box className="absolute inset-0 w-full h-full bg-cover bg-center" style={{backgroundImage: `url(${background.mediaUrl})`}} />}
                {/*background.mediaUrl && <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover">
                    <source src={background.mediaUrl} type="video/mp4" />
                </video>*/}
            </>}
            {(background.mediaUrl) && <div className="absolute inset-0  w-full h-full  bg-black opacity-30" />}
        </>
    )

}