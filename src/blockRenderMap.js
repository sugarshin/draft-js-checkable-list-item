import React from 'react'
import { Map } from 'immutable'
import { CHECKABLE_LIST_ITEM, UNORDERED_LIST_ITEM } from './constants'

// https://github.com/facebook/draft-js/blob/master/src/model/immutable/DefaultDraftBlockRenderMap.js#L20
const WRAPPER = <ul className='public-DraftStyleDefault-ul' />

const blockRenderMap = Map({
  [CHECKABLE_LIST_ITEM]: {
    element: 'li',
    wrapper: WRAPPER
  }
})

const blockRenderMapForSameWrapperAsUnorderedListItem = blockRenderMap.merge(Map({
  [UNORDERED_LIST_ITEM]: {
    element: 'li',
    wrapper: WRAPPER
  }
}))

export default blockRenderMap
export { WRAPPER, blockRenderMapForSameWrapperAsUnorderedListItem }
