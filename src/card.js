import React, { Component } from 'react';
import './App.css';

class Card extends Component {
  state = {
    isActive: false,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected !== this.props.selected && nextProps.selected) {
      this.setState({
        isActive: true
      });
    }
  };

  cardClick = () => {
    const {handleClick, selected} = this.props;

    handleClick();
    if(selected){
      this.setState({
        isActive: !this.state.isActive
      })
    }
  };
 
  render() {
    const { isActive } = this.state;
    const { id, value, isVisible } = this.props;

    let cardClasses = 'card';
    if (isActive) {
      cardClasses += " card--active";
    } else {
      cardClasses += " card--passive";
    }
    
    return(
      <>
        <div className={cardClasses} onClick={this.cardClick}>
          <div className={isVisible ? "box--active" : "box--passive"}id={id}>{value}</div>
        </div>
      </>
    );
  }
}

export default Card;
