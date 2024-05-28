import React, { Component } from "react"
import axios from "axios";
import Card from "./card.js";
import "./deck.css"
const API_URL_BASE = "https://deckofcardsapi.com/api/deck"


class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unique_deck: {},
            deck: [],
            still_cards: true

        }
        this.getCard = this.getCard.bind(this)
    }
    componentDidMount() {
        axios.get(API_URL_BASE + '/new/shuffle').then(
            response =>
                this.setState({ unique_deck: response.data })
        )
        
    }
    async getCard() {
        const deck_id = this.state.unique_deck.deck_id
        try {
            const draw = await axios.get(API_URL_BASE + `/${deck_id}/draw/`)
            if (!draw.data.success) {
                this.setState({ still_cards: false })
                throw new Error("No cards Remaining")
            }
            this.setState(curSt => ({
                deck: [...curSt.deck, draw.data]
            }))
        } catch (error) {
            alert(error);
        }
    }


    render() {
        const draw_card =this.state.deck.map(item => (
                    // console.log(item)
                    <div className="card-deck">
                    <Card
                        card={item.cards[0].image}
                        key = {item.cards[0].value +" " +item.cards[0].suit}
                        alt_val={item.cards[0].value}
                        alt_suit={item.cards[0].suit}
                        deck_id={item.deck_id} />
                    </div>
                ))
        return (
            <div>
                <h1 className="Deck-title">Card Dealer</h1>
                <h2 className="Deck-title subtitle">React App that draws cards</h2>
                <button className= "Deck-btn" onClick={this.getCard}>Get New Card</button>
                {draw_card}
            </div>
        )
    }
}

export default Deck