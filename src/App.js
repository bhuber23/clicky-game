import React, { Component } from 'react';
import ImageCard from "./components/ImageCard";
import Title from "./components/Title";
import Wrapper from "./components/Wrapper";
import cardImage from "./cardImage.json";
import "./index.css";
import "./App.css";


let correctGuesses = 0;
let topScore = 0;
let updateMessage = "Click on a cat image below to earn points. If you click on the same image twice, you lose."


class App extends Component {
  state = {
    cardImage,
    correctGuesses,
    topScore,
    updateMessage
  };

  randomizeImages = cardImage => {
    cardImage.sort((a, b) => {
      return 0.5 - Math.random();
    });
  };

  //Update the clicked status by id
  updateClicked = id => {
    const cardImage = this.state.cardImage;
    const clickedImage = cardImage.filter(cardImage => cardImage.id === id);

    //If they click an image that was already clicked
    if (clickedImage[0].clicked){
      correctGuesses = 0;
      updateMessage = "Sorry! You already clicked that one. Try again."
      this.randomizeImages(cardImage);

      cardImage.forEach(image => cardImage.clicked = false);

      this.setState({updateMessage});
      this.setState({correctGuesses});
      this.setState({cardImage});
    }
  
    //For images they haven't clicked, but there's still one card left
    else if (correctGuesses < 11){
      clickedImage[0].clicked = true;
      correctGuesses++;

      updateMessage = "Good job! That was one you haven't clicked yet! Keep playing.";

      if (correctGuesses > topScore){
        topScore = correctGuesses;
        this.setState({topScore});
      }
      this.randomizeImages(cardImage);
      this.setState({updateMessage});
      this.setState({correctGuesses});
      this.setState({cardImage});
    }
    //When all 12 are guessed correctly 
    else {
      clickedImage[0] = true;
      correctGuesses = 0;
      updateMessage = "Congrats! You got them all right! Click to play again.";
      topScore = 12;
      this.setState({topScore});

      cardImage.forEach(image => cardImage.clicked = false);
      this.randomizeImages(cardImage);
      this.setState({updateMessage});
      this.setState({correctGuesses});
      this.setState({cardImage});
    }


  };

  render() {
    return (
      <Wrapper>
        <Title>Kitty Cat Clicky App</Title>
        <h2 className="headerMessage">{this.state.updateMessage}</h2>
        <div className="container score-container">
        <h3>Correct Guesses: {this.state.correctGuesses}
        <br/> Top Score: {this.state.topScore}
        </h3>
        </div>
        <div className="container">
          <div className="row">
            {this.state.cardImage.map(image => (
              <ImageCard 
                  updateClicked={this.updateClicked}
                  id={image.id}
                  key={image.id}
                  image={image.image}
              />
            ))}
          </div>
        </div>
      </Wrapper>
    );
  }


}




export default App;
