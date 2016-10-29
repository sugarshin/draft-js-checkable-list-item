import 'react-ghfork/gh-fork-ribbon.ie.css'
import 'react-ghfork/gh-fork-ribbon.css'
import 'draft-js/dist/Draft.css'
import '../src/CheckableListItem.styl'
import './App.styl'
import React, { Component } from 'react'
import Fork from 'react-ghfork'
import { Editor, EditorState, RichUtils, DefaultDraftBlockRenderMap } from 'draft-js'
import type ContentBlock from 'draft-js/lib/ContentBlock'
import {
  blockRenderMapForSameWrapperAsUnorderedListItem as blockRenderMap, blockStyleFn, CheckableListItem, onTab, updateBlockMetadata,
  CHECKABLE_LIST_ITEM, UNORDERED_LIST_ITEM, ORDERED_LIST_ITEM
} from '../src'

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
      <div className='app'>
        <Fork project='sugarshin/draft-js-checkable-list-item' className='right' />
        <h1>draft-js-checkable-list-item</h1>
        <div className='toolbar'>
          <span onMouseDown={this.createMouseDownHandler(UNORDERED_LIST_ITEM)} style={this.getStyle(UNORDERED_LIST_ITEM)}>UL</span>
          <span onMouseDown={this.createMouseDownHandler(ORDERED_LIST_ITEM)} style={this.getStyle(ORDERED_LIST_ITEM)}>OL</span>
          <span onMouseDown={this.createMouseDownHandler(CHECKABLE_LIST_ITEM)} style={this.getStyle(CHECKABLE_LIST_ITEM)}>✔</span>
        </div>
        <div onClick={() => this.editor.focus()}>
          <Editor
            ref={c => this.editor = c}
            placeholder='Contents in here...'
            blockRendererFn={this.blockRendererFn}
            blockRenderMap={DefaultDraftBlockRenderMap.merge(blockRenderMap)}
            blockStyleFn={blockStyleFn}
            editorState={this.state.editorState}
            onChange={this.changeEditorState}
            onTab={this.handleTab}
          />
        </div>
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

  getStyle(type: string): object {
    return {
      cursor: 'pointer',
      margin: '0 1em 0 0',
      color: this.getCurrentBlockType() === type ? 'indianred' : 'inherit',
    }
  }

  getCurrentBlockType(): string {
    const { editorState } = this.state
    const selection = editorState.getSelection()
    return editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType()
  }

  renderCheckableListItem(block: ContentBlock): object {
    return {
      component: CheckableListItem,
      props: {
        updateMetadataFn: metadata => this.setState({
          editorState: updateBlockMetadata(this.state.editorState, block.getKey(), metadata)
        }),
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
