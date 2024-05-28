import React, { Component } from "react";
import "./card.css"

class Card extends Component{
    constructor(props) {
        super(props);
        let angle = Math.random() * 90 - 45
        let xPos = Math.random() * 40 - 20
        let yPos = Math.random() * 40 - 20
        this._transform = `translate(${xPos}px, ${yPos}px) rotate(${angle}deg)`
        
        this.state = {

        }

    }
    render() {
        const alt_text = this.props.alt_val + " "+this.props.alt_suit
        return (
            // <div >
                <img
                    style={{transform: this._transform}}
                    className="Card"
                    src={this.props.card}
                    alt={alt_text}
                    
                />
            // </div>
        )
    }
}

export default Card;