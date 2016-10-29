import React, { Component } from 'react'
import { EditorBlock } from 'draft-js'

export type Props = {
  offsetKey: string,
  blockProps: { updateMetadataFn: func, checked: boolean },
  block: object,
}

export default class CheckableListItem extends Component {
  props: Props

  toggleChecked = () => {
    const { blockProps: { updateMetadataFn, checked }, block } = this.props
    updateMetadataFn(block.getKey(), { checked: !checked })
  }

  render() {
    const { offsetKey, blockProps: { checked } } = this.props
    return (
      <div
        className='checkable-list-item'
        data-offset-key={offsetKey}
      >
        <div
          className={`checkable-list-item__checkbox${checked ? ' is-checked' : ''}`}
          contentEditable='false'
          suppressContentEditableWarning
        >
          <input type='checkbox' checked={checked} onChange={this.toggleChecked} />
        </div>
        <div className='checkable-list-item__text'>
          <EditorBlock {...this.props} />
        </div>
      </div>
    )
  }
}
