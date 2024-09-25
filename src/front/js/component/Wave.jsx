import React from 'react';

export const Wave = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 120"
        style={{ 
            width: '100%', 
            height: 'auto',
            display: 'block',  // Añadido para eliminar espacio extra
            marginBottom: '-1px'  // Añadido para eliminar el espacio entre SVGs
        }}
    >
        <path
            fill="black"
            fillOpacity="1"
            d="M0,64L48,69.3C96,75,192,85,288,85.3C384,85,480,75,576,58.7C672,43,768,21,864,26.7C960,32,1056,64,1152,74.7C1248,85,1344,75,1392,69.3L1440,64V120H1392C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120H0Z"
        ></path>
    </svg>
);

export const WaveFlipped = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 120"
        style={{ 
            width: '100%', 
            height: 'auto',
            display: 'block',  // Añadido para eliminar espacio extra
            marginTop: '-1px'  // Añadido para eliminar el espacio entre SVGs
        }}
    >
        <path
            fill="#000000"  // Color negro para la parte superior
            d="M0,80L48,70C96,60,192,40,288,50.7C384,64,480,96,576,90.7C672,85,768,64,864,54.7C960,45,1056,46,1152,66.7C1248,85,1344,115,1392,120L1440,120V0H0Z"
        ></path>
    </svg>
);