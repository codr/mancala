/*
 * action types
 */

export const EMPTY_HOLE = 'EMPTY_HOLE'

/*
 * action creators
 */

export function emptyHole(row, column) {
  return { type: EMPTY_HOLE, row, column }
}
