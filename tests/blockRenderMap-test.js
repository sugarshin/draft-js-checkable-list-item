import { Map } from 'immutable'
import blockRenderMap, { blockRenderMapForSameWrapperAsUnorderedListItem, WRAPPER } from '../src/blockRenderMap'
import { CHECKABLE_LIST_ITEM, UNORDERED_LIST_ITEM } from '../src/constants'

describe('blockRenderMap', () => {
  it('CHECKABLE_LIST_ITEM', () => {
    expect(blockRenderMap).toBeInstanceOf(Map)
    expect(blockRenderMap.get(CHECKABLE_LIST_ITEM).element).toBe('li')
    expect(blockRenderMap.get(CHECKABLE_LIST_ITEM).wrapper).toBe(WRAPPER)
  })

  it('Same wrapper as UNORDERED_LIST_ITEM', () => {
    expect(blockRenderMapForSameWrapperAsUnorderedListItem).toBeInstanceOf(Map)
    expect(blockRenderMapForSameWrapperAsUnorderedListItem.get(UNORDERED_LIST_ITEM).element).toBe('li')
    expect(blockRenderMapForSameWrapperAsUnorderedListItem.get(UNORDERED_LIST_ITEM).wrapper).toBe(WRAPPER)
    expect(blockRenderMapForSameWrapperAsUnorderedListItem.get(CHECKABLE_LIST_ITEM)).toBeInstanceOf(Object)
  })
})
