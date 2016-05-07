import { expect } from '../test_helper';
import { isGameOver } from '../../src/actions';

describe('actions', () => {

  describe('isGameOver', () => {

    it('ends the game when player 0 has no more moves', () => {
      const board = [
        [20, 0, 0, 0, 0, 0, 0],
        [1, 1, 2, 2, 2, 10, 10]
      ];
      expect( isGameOver(board) ).to.be.true;
    })

    it('ends the game when player 1 has no more moves', () => {
      const board = [
        [10, 1, 2, 2, 2, 10, 1],
        [0, 0, 0, 0, 0, 0, 20]
      ];
      expect( isGameOver(board) ).to.be.true;
    })

  })

})
