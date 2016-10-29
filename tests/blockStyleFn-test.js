import ContentBlock from 'draft-js/lib/ContentBlock'
import blockStyleFn from '../src/blockStyleFn'
import { CHECKABLE_LIST_ITEM } from '../src/constants'

describe('blockStyleFn', () => {
  it('Should return `checkable-list-item`', () => {
    const block = new ContentBlock({ type: CHECKABLE_LIST_ITEM })
    expect(blockStyleFn(block)).toBe(CHECKABLE_LIST_ITEM)
  })
  it('noop', () => {
    const block = new ContentBlock({ type: 'unstyled' })
    expect(blockStyleFn(block)).toBeUndefined()
  })
})
