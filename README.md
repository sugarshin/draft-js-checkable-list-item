# draft-js-checkable-list-item

[![CircleCI](https://circleci.com/gh/sugarshin/draft-js-checkable-list-item/tree/master.svg?style=svg&circle-token=b4cb74ab6a5a470fd7a6752d755ecb271db448e5)](https://circleci.com/gh/sugarshin/draft-js-checkable-list-item/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/sugarshin/draft-js-checkable-list-item/badge.svg?branch=master)](https://coveralls.io/github/sugarshin/draft-js-checkable-list-item?branch=master)

[![Dependency Status][david-image]][david-url]
[![Devdependency Status][david-dev-image]][david-dev-url]
[![npm version][npm-image]][npm-url]
[![License][license-image]][license-url]

Checkable list item for [Draft.js](https://github.com/facebook/draft-js)

```sh
npm i draft-js-checkable-list-item
```

[Live demo](https://sugarshin.github.io/draft-js-checkable-list-item/)

## Usage

Example

```js
import React, { Component } from 'react'
import { Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap } from 'draft-js'
import type ContentBlock from 'draft-js/lib/ContentBlock'
import {
  blockRenderMap, blockStyleFn, CheckableListItem, onTab, updateBlockMetadata,
  CHECKABLE_LIST_ITEM, UNORDERED_LIST_ITEM, ORDERED_LIST_ITEM
} from 'draft-js-checkable-list-item'
import 'draft-js/dist/Draft.css'
import 'draft-js-checkable-list-item/lib/CheckableListItem.css'

export default class App extends Component {
  blockRendererFn = (block: ContentBlock) => {
    if (block.getType() === CHECKABLE_LIST_ITEM) {
      return this.renderCheckableListItem(block)
    }
    return null
  }

  handleTab = (ev: SyntheticKeyboardEvent) => {
    if (this.adjustBlockDepth(ev)) {
      return true
    }
    const { editorState } = this.state
    const newEditorState = RichUtils.onTab(ev, editorState, 4)
    if (newEditorState !== editorState) {
      this.changeEditorState(newEditorState)
    }
  }

  changeEditorState = (editorState: EditorState) => this.setState({ editorState })

  state: { editorState: EditorState }
  state = { editorState: EditorState.createEmpty() }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <div>
          <span onMouseDown={this.createMouseDownHandler(UNORDERED_LIST_ITEM)}>UL</span>
          <span onMouseDown={this.createMouseDownHandler(ORDERED_LIST_ITEM)}>OL</span>
          <span onMouseDown={this.createMouseDownHandler(CHECKABLE_LIST_ITEM)}>✔</span>
        </div>
        <Editor
          blockRendererFn={this.blockRendererFn}
          blockRenderMap={DefaultDraftBlockRenderMap.merge(blockRenderMap)}
          blockStyleFn={blockStyleFn}
          editorState={this.state.editorState}
          onChange={this.changeEditorState}
          onTab={this.handleTab}
        />
      </div>
    )
  }

  toggleBlockType(type: string) {
    this.changeEditorState(RichUtils.toggleBlockType(this.state.editorState, type))
  }

  createMouseDownHandler(type: string): func {
    return (ev: SyntheticEvent) => {
      ev.preventDefault()
      this.toggleBlockType(type)
    }
  }

  renderCheckableListItem(block: ContentBlock): object {
    return {
      component: CheckableListItem,
      props: {
        updateMetadataFn: (...args) => this.setState({ editorState: updateBlockMetadata(this.state.editorState, ...args) }),
        checked: !!block.getData().get('checked'),
      },
    }
  }

  adjustBlockDepth(ev: SyntheticKeyboardEvent): boolean {
    const { editorState } = this.state
    const newEditorState = onTab(ev, editorState, 4)
    if (newEditorState !== editorState) {
      this.changeEditorState(newEditorState)
      return true
    }
    return false
  }
}
```

## Contributing

1. Fork it!
2. Create your feature branch: git checkout -b my-new-feature
3. Commit your changes: git commit -am 'Add some feature'
4. Push to the branch: git push origin my-new-feature
5. Submit a pull request :D

## License

[MIT][license-url]

© sugarshin

[npm-image]: https://img.shields.io/npm/v/draft-js-checkable-list-item.svg?style=flat-square
[npm-url]: https://www.npmjs.org/package/draft-js-checkable-list-item
[david-image]: https://david-dm.org/sugarshin/draft-js-checkable-list-item.svg?style=flat-square
[david-url]: https://david-dm.org/sugarshin/draft-js-checkable-list-item
[david-dev-image]: https://david-dm.org/sugarshin/draft-js-checkable-list-item/dev-status.svg?style=flat-square
[david-dev-url]: https://david-dm.org/sugarshin/draft-js-checkable-list-item#info=devDependencies
[license-image]: https://img.shields.io/:license-mit-blue.svg?style=flat-square
[license-url]: https://sugarshin.mit-license.org/
