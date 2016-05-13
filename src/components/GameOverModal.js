import React, { Component } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    padding               : '0',
    minWidth              : '300'
  },
  overlay : {
    zIndex                : '50',
  }
};

export default class GameOverModal extends Component {

  render() {
    const {score, resetGame, ...props} = this.props;
    return (
      <Modal
        {...props}
        onRequestClose={resetGame}
        style={customStyles}
        >
        <div className="modal-header">
          <button
            type="button"
            className="close"
            onClick={resetGame}>
            <span>×</span>
          </button>
          <h4 className="modal-title">Game Over</h4>
        </div>
        <div className="modal-body text-center">
          <h3>{`Player ${score.indexOf(Math.max(...score)) + 1} wins!`}</h3>
          <div className="row">
            <h4 className="col-xs-6">Player 1</h4>
            <h4 className="col-xs-6">Player 2</h4>
          </div>
          <div className="row">
            <div className="col-xs-6">{score[0]}</div>
            <div className="col-xs-6">{score[1]}</div>
          </div>
        </div>
      </Modal>
    );
  }
}
