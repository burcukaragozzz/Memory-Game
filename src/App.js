import React, { Component } from 'react';
import './App.css';
import cardNumbers from './cardNumbers';
import Card from './card';

class App extends Component {
  constructor() {
    super();
    this.state = {
      numbers: cardNumbers,
      firstSelectedItem: null,
      secondSelectedItem: null,
      selectedCount: 0,
      score: 225,
	  text: '',
	  openedCard: 0,
	  angle: null,
    };
  }

  onClicked = (itemValue, itemId) => {
    const { firstSelectedItem } = this.state;

    if (firstSelectedItem) {
      this.setState({
        secondSelectedItem: {
          value: itemValue, 
          id: itemId,
        },
		openedCard: this.state.openedCard + 1,
      }, () => {
			if(this.state.firstSelectedItem.id !== itemId && firstSelectedItem.value === itemValue) {
				setTimeout(() => {
				this.increaseSelectedCount();
				}, 600);
			} else {
				this.updateScore();
			}
		});
    } else {
      this.setState({
        firstSelectedItem: {
          value: itemValue,
          id: itemId,
        },
		openedCard: this.state.openedCard + 1,
      });
    }
};

  increaseSelectedCount = () => {
    const { selectedCount} = this.state;
    this.setState({
		firstSelectedItem: null,
		secondSelectedItem: null,
      	selectedCount: selectedCount + 2,
		openedCard: 0,
    });
};

  updateScore = () => {
	const { score } = this.state;
	let rotateAngle= 0;

	setTimeout(() => {
		this.setState({
		openedCard: 0,
	    score: this.state.score - 5,
		firstSelectedItem: null,
		secondSelectedItem: null,
	  });
	}, 600);

	rotateAngle= (score*1.8)-30;
	this.setState({
		angle: rotateAngle,
    });
};

  isSelected = cardItem => {
    const { firstSelectedItem, secondSelectedItem } = this.state;
    if (firstSelectedItem && secondSelectedItem && firstSelectedItem.id !== secondSelectedItem.id && firstSelectedItem.value === secondSelectedItem.value) {
     return firstSelectedItem.value === cardItem.value || secondSelectedItem.value === cardItem.value 
    }
};

  renderGameOver = () => (
	<div className="gameOver">
		<div className="imageContainer">
			<img className="resultScore" src="images/solo-test_2324.jpg" alt="backgroundImage"/>
		</div>
		<div className="resultLine" style={ { transform: `rotate(${ this.state.angle }deg)`} }>
			<div className="line_1"></div>
			<div className="line_2"></div>
		</div>
		<div className = "score">{this.state.text}</div>
		<button onClick = {() => window.location.reload(false)}>New Game</button>
	</div>
   )
  
  render() {
    const { firstSelectedItem, secondSelectedItem, selectedCount, numbers, openedCard } = this.state;

    return(
      <div className="content">
        { selectedCount === numbers.length ? this.renderGameOver() : 
		  (<div className="cards">{numbers.map((item, i) =>
	          <Card 
	             id={item.id} 
	             value={item.value} 
	             handleClick={() => openedCard === 2 ? null : this.onClicked(item.value,item.id)} 
	             selected={this.isSelected(item)}
	             isVisible={(firstSelectedItem && firstSelectedItem.id === item.id ) || (secondSelectedItem && secondSelectedItem.id === item.id)}
	           />
            )}</div>
          )
        }
      </div>
    );
  }
}

export default App;

