import React, { Component } from 'react';
import './App.css';

class Card extends Component {
  state = {
    isActive: false,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selected) {
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
    
    return(
      <>
        <div
          className="card cardClick"
          style={{ backgroundColor: `${ isActive ? 'white' : ' rgb(53, 52, 51)'}`,transition: '1s', pointerEvents: `${ isActive ? 'none' : 'auto'}`}}
          onClick={this.cardClick}>
          <div className={isVisible ? "box-active" : "box-passive"}
          style={{ color: `${ isActive ? 'transparent' : '#c0ff3e'}`}}
          id={id}>{value} 
          </div>
        </div>
      </>
    );
  }
}

export default Card;
