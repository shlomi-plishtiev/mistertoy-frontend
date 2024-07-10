import React from 'react';
import GoogleMapReact from 'google-map-react';

const shopBranches = [
    { id: 1, name: '🛒', lat: 31.949181, lng: 34.893261 },
    { id: 2, name: '🛒', lat: 32.0753, lng: 34.7758 },
    { id: 3, name: '🛒', lat: 32.0953, lng: 34.7908 },
    { id: 4, name: '🛒', lat: 31.886549, lng: 34.813594 },
    { id: 5, name: '🛒', lat: 31.806102, lng: 34.652208 },
    { id: 6, name: '🛒', lat: 32.088538, lng: 34.869140 },
];

const AnyReactComponent = ({ text }) => <div style={{ fontSize: '2em' }}>{text}</div>;

export function GoogleMap() {
    const defaultCenter = { lat: 32.0853, lng: 34.7818 };
    const defaultZoom = 11;

    return (
        <div style={{ height: '70vh', width: '50%', margin: 'auto' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyBaRClBmmP7JbZ4YIuV5tMooPUxlcLOQtE' }}
                defaultCenter={defaultCenter}
                defaultZoom={defaultZoom}
            >
                {shopBranches.map(branch => (
                    <AnyReactComponent
                        key={branch.id}
                        lat={branch.lat}
                        lng={branch.lng}
                        text={branch.name}
                    />
                ))}
            </GoogleMapReact>
        </div>
    );
}