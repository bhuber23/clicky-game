import React from "react";
import "./ImageCard.css";

const ImageCard = props => (
    <div onClick={() => props.updateClicked(props.id)} className="col-md-3 cat-image zoom">
        <div className="img-container">
            <img alt={props.name} src={props.image} />
        </div>
    </div>
)

export default ImageCard;