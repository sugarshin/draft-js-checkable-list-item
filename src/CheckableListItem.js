/* @flow */

import React, { Component } from 'react'
import { EditorBlock } from 'draft-js'

export type Props = {
  offsetKey: string,
  blockProps: { onChangeChecked: () => void, checked: boolean },
}

export default class CheckableListItem extends Component {
  props: Props

  render() {
    const { offsetKey, blockProps: { onChangeChecked, checked } } = this.props
    return (
      <div
        className={`checkable-list-item-block${checked ? ' is-checked' : ''}`}
        data-offset-key={offsetKey}
      >
        <div
          className='checkable-list-item-block__checkbox'
          contentEditable={false}
          suppressContentEditableWarning
        >
          <input type='checkbox' checked={checked} onChange={onChangeChecked} />
        </div>
        <div className='checkable-list-item-block__text'>
          <EditorBlock {...this.props} />
        </div>
      </div>
    )
  }
}
