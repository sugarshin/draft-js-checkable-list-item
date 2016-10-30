import React, { Component } from 'react'
import ContentBlock from 'draft-js/lib/ContentBlock'
import { shallow } from 'enzyme'
import CheckableListItem from '../src/CheckableListItem'
import { CHECKABLE_LIST_ITEM } from '../src/constants'

describe('CheckableListItem', () => {
  it('is React component', () => {
    expect(CheckableListItem.constructor.prototype.constructor).toBe(Component.constructor)
  })

  // TODO
  it.skip('Render', () => {
    const block = new ContentBlock({ type: CHECKABLE_LIST_ITEM })
    const component = shallow(
      <CheckableListItem
        offsetKey='0'
        block={block}
        blockProps={{ updateMetadataFn() {}, checked: false }}
      />
    )
    expect(component.html()).toEqual('')
  })
})
