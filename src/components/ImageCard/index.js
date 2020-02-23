import React from "react";
import "./ImageCard.css";

const ImageCard = props => (
    <div onClick={() => props.updateClicked(props.id)} className="card">
        <div className="img-container">
            <img alt={props.name} src={props.image} />
        </div>
    </div>
)

export default ImageCard;