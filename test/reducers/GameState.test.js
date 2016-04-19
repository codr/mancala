import { expect } from '../test_helper';
import { emptyHole } from '../../src/actions';
import GameState from '../../src/reducers/GameState';

describe('GameState' , () => {

  describe('.board', () => {

    it('has the correct default board', () => {
      var initialState = undefined; // default.
      var action = {type: undefined}; // no action

      var newState = GameState(initialState, action);

      expect( newState.board ).to.eql([
        [0, 4, 4, 4, 4, 4, 4],
        [4, 4, 4, 4, 4, 4, 0]
      ]);
    });

    it('moves hole correctly', () => {
      var initialState = undefined; // default.
      var action = emptyHole(0, 4);

      var newState = GameState(initialState, action);

      expect( newState.board ).to.eql([
        [1, 5, 5, 5, 0, 4, 4],
        [4, 4, 4, 4, 4, 4, 0]
      ]);
    });

    it('moves around to the oponents row', () => {
      var initialState = undefined; // default.
      var action = emptyHole(1, 5);

      var newState = GameState(initialState, action);

      expect( newState.board ).to.eql([
        [0, 4, 4, 5, 5, 5, 5],
        [4, 4, 4, 4, 4, 0, 0]
      ]);
    });

    it('circles the board', () => {
      var initialState = {
        board: [
          [1, 2, 2, 2, 2, 2, 2],
          [4, 4, 4, 4, 1, 14, 0]],
        turn: 1,
      };
      var action = emptyHole(1, 5);

      var newState = GameState(initialState, action);

      expect( newState.board ).to.eql([
        [1, 3, 3, 3, 3, 3, 3],
        [5, 5, 5, 5, 2, 1, 2]
      ]);
    });

    it('captures the oponents hole', () => {
      var initialState = {
        board: [
          [6, 10, 4, 4, 0, 2, 1],
          [9, 1, 0, 6, 0, 0, 5]
        ],
        turn: 1,
      }
      var action = emptyHole(1, 1);

      var newState = GameState(initialState, action);

      expect( newState.board ).to.eql([
        [6, 10, 4, 0, 0, 2, 1],
        [9, 0, 0, 6, 0, 0, 10]
      ])
    });

  });

  describe('.turn', () => {

    describe('when it is play 0s turn', () => {
      var initialState;

      beforeEach(() => {
        initialState = {
          board: [
            [0, 1, 4, 3, 4, 5, 6],
            [6, 5, 4, 3, 2, 1, 0]
          ],
          turn: 0,
        };
      });

      it('does not change turn if last bead is on end', () => {
        var action = emptyHole(0, 4)

        var newState = GameState(initialState, action);

        expect( newState.turn ).to.be.eql(0);
      });

      it('does change turn if last bead is on elsewhere', () => {
        var action = emptyHole(0, 2)

        var newState = GameState(initialState, action);

        expect( newState.turn ).to.be.eql(1);
      });

    });

    describe('when it is play 1s turn', () => {
      var initialState;

      beforeEach(() => {
        initialState = {
          board: [
            [0, 1, 2, 3, 4, 5, 6],
            [6, 5, 4, 3, 2, 2, 0]
          ],
          turn: 1,
        };
      });

      it('does not change turn if last bead is on end', () => {
        var action = emptyHole(1, 3)

        var newState = GameState(initialState, action);

        expect( newState.turn ).to.be.eql(1);
      });


      it('does change turn if last bead is on elsewhere', () => {
        var action = emptyHole(1, 5)

        var newState = GameState(initialState, action);

        expect( newState.turn ).to.be.eql(0);
      });

    });

  });

});
