import React from 'react';
import './index.css'; // import the CSS file for the shimmer effect

const ImageShimmer = ({ width, height }) => {
    return (
        <div className="image-shimmer" style={{ width, height }}>
            <div className="shimmer"></div>
        </div>
    );
};

export default ImageShimmer;
