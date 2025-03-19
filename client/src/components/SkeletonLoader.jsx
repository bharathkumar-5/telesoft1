import React from "react";
import "../styles/SkeletonLoader.css"


const SkeletonLoader = () => (
  <div className="skeleton-loader">
    <div className="skeleton-image"></div>
    <div className="skeleton-text"></div>
    <div className="skeleton-text"></div>
    <div className="skeleton-text"></div>
  </div>
);

export default SkeletonLoader;