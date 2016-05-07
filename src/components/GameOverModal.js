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
    minWidth              : '475'
  }
};

export default class GameOverModal extends Component {

  render() {
    const {score, resetGame, ...props} = this.props;
    return (
      <Modal
        {...props}
        ref="modal"
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
          <h4 ref="subtitle" className="modal-title">Game Over</h4>
        </div>
        <div className="modal-body text-center">
          <h3>Score</h3>
          <div className="row">
            <h4 className="col-xs-6">Player 1</h4>
            <h4 className="col-xs-6">Player 2</h4>
          </div>
          <div className="row">
            <div className="col-xs-6">{score[0]}</div>
            <div className="col-xs-6">{score[1]}</div>
          </div>
          <div>
            {`Player ${score.indexOf(Math.max(...score)) + 1} wins!`}
          </div>
        </div>
      </Modal>
    );
  }
}
