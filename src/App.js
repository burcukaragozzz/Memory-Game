import React, { Component } from 'react';
import './App.css';
import cardNumbers from './cardNumbers';
import Card from './card';

class App extends Component {
  constructor() {
    super();
    this.state = {
      numbers: cardNumbers,
      firstSelectedItem: null,
      secondSelectedItem: null,
      selectedCount: 0,
      score: 230,
      openedCard: 0,
      angle: null,
    };
  }

  onClicked = (itemValue, itemId) => {
    const { firstSelectedItem } = this.state;

    if (firstSelectedItem) {
      this.setState({
        secondSelectedItem: {
          value: itemValue,
          id: itemId,
        },
        openedCard: this.state.openedCard + 1,
      }, () => {
        if (this.state.firstSelectedItem.id !== itemId && firstSelectedItem.value === itemValue) {
          setTimeout(() => {
            this.increaseSelectedCount();
          }, 600);
        } else {
          this.updateScore();
        }
      });
    } else {
      this.setState({
        firstSelectedItem: {
          value: itemValue,
          id: itemId,
        },
        openedCard: this.state.openedCard + 1,
      });
    }
  };

  increaseSelectedCount = () => {
    this.setState(prevstate => ({
      firstSelectedItem: null,
      secondSelectedItem: null,
      selectedCount: prevstate.selectedCount + 2,
      openedCard: 0,
    }));
  };

  updateScore = () => {
    const { score } = this.state;
    let rotateAngle = 0, brainlessScoreAngle= 30, selectedAllCount= 16, errorScore= 10;
    const scoreAngleRatio= (360/230); // 230==maxiumum score 
    if (score === 0) {
      this.setState({
        score: 0,
        angle: brainlessScoreAngle,
        selectedCount: selectedAllCount,
      });
    } else {
      setTimeout(() => {
        this.setState({
          openedCard: 0,
          score: this.state.score - errorScore,
          firstSelectedItem: null,
          secondSelectedItem: null,
        });
      }, 600);

      rotateAngle = (score * scoreAngleRatio);
      this.setState({
        angle: rotateAngle,
      });
    }
  };

  isSelected = cardItem => {
    const { firstSelectedItem, secondSelectedItem } = this.state;
    if (firstSelectedItem && secondSelectedItem && firstSelectedItem.id !== secondSelectedItem.id && firstSelectedItem.value === secondSelectedItem.value) {
      return firstSelectedItem.value === cardItem.value || secondSelectedItem.value === cardItem.value
    }
  };

  renderGameOver = () => (
    <div className="game-score-container">
      <figure className="game-score-table">
        <img className="game-score-table__image" src="images/solo-test_2324.jpg" alt="backgroundImage" />
      </figure>
      <div className="game-score-result-line" style={{ transform: `translate(-50%, -40%) rotate(${this.state.angle}deg)` }}>
        <div className="game-score-result-line__left-visible"></div>
        <div className="game-score-result-line__right-hidden"></div>
      </div>
      <button onClick={() => window.location.reload(false)}>New Game</button>
    </div>	
  )

  render() {
    const { firstSelectedItem, secondSelectedItem, numbers, selectedCount, openedCard } = this.state;
    const openedCardLength = 2;
    const cardMaps = numbers.map((item, i) =>
      <Card
        id={item.id}
        value={item.value}
        handleClick={() => openedCard === openedCardLength ? null : this.onClicked(item.value, item.id)}
        selected={this.isSelected(item)}
        isVisible={(firstSelectedItem && firstSelectedItem.id === item.id) || (secondSelectedItem && secondSelectedItem.id === item.id)}
      />
    )
    return (
      <div className="content">
        {selectedCount === numbers.length ? this.renderGameOver() :
          <div className="cards">{cardMaps}</div>
        }
      </div>
    );
  }
}

export default App;

