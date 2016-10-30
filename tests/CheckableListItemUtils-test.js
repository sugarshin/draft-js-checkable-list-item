import { EditorState, ContentState, ContentBlock, SelectionState } from 'draft-js'
import { Map } from 'immutable'
import moveSelectionToEnd from './helpers/moveSelectionToEnd'
import CheckableListItemUtils from '../src/CheckableListItemUtils'
import { CHECKABLE_LIST_ITEM } from '../src/constants'

const baseMockEvent = { preventDefault() {}, shiftKey: false }

describe('CheckableListItemUtils', () => {
  describe('toggleChecked', () => {
    let editorState
    const KEY = '0'

    beforeEach(() => {
      const content = ContentState.createFromBlockArray([
        new ContentBlock({ key: KEY, type: CHECKABLE_LIST_ITEM, data: Map({ checked: false }) })
      ])
      editorState = EditorState.createWithContent(content)
    })

    it('Toggle', () => {
      const newEditorState = CheckableListItemUtils.toggleChecked(editorState, editorState.getCurrentContent().getBlockForKey(KEY))
      const block = newEditorState.getCurrentContent().getBlockForKey(KEY)
      expect(block.getData().get('checked')).toBe(true)
    })
  })

  describe('onTab', () => {
    describe('Change depth', () => {
      const KEY0 = '0'
      const KEY1 = '1'
      const content = ContentState.createFromBlockArray([
        new ContentBlock({ key: KEY0, type: CHECKABLE_LIST_ITEM, data: Map({ checked: false }) }),
        new ContentBlock({ key: KEY1, type: CHECKABLE_LIST_ITEM, data: Map({ checked: true }) }),
      ])
      let editorState = EditorState.createWithContent(content)

      it('Increment', () => {
        const ev = Object.assign({}, baseMockEvent)
        editorState = moveSelectionToEnd(editorState)
        editorState = CheckableListItemUtils.onTab(ev, editorState, 4)
        const block = editorState.getCurrentContent().getBlockForKey(KEY1)
        expect(block.getDepth()).toBe(1)
      })

      it('Decrement', () => {
        const ev = Object.assign({}, baseMockEvent, { shiftKey: true })
        editorState = moveSelectionToEnd(editorState)
        editorState = CheckableListItemUtils.onTab(ev, editorState, 4)
        const block = editorState.getCurrentContent().getBlockForKey(KEY1)
        expect(block.getDepth()).toBe(0)
      })
    })

    describe('noop', () => {
      it('Other than list', () => {
        const KEY0 = '0'
        const content = ContentState.createFromBlockArray([
          new ContentBlock({ key: KEY0, type: 'unstyled' }),
        ])
        let editorState = EditorState.createWithContent(content)

        const ev = Object.assign({}, baseMockEvent)
        editorState = moveSelectionToEnd(editorState)
        const newEditorState = CheckableListItemUtils.onTab(ev, editorState, 4)
        expect(editorState).toBe(newEditorState)
      })

      it('is only itself', () => {
        const KEY0 = '0'
        const content = ContentState.createFromBlockArray([
          new ContentBlock({ key: KEY0, type: CHECKABLE_LIST_ITEM, data: Map({ checked: false }) }),
        ])
        let editorState = EditorState.createWithContent(content)

        const ev = Object.assign({}, baseMockEvent)
        editorState = moveSelectionToEnd(editorState)
        const newEditorState = CheckableListItemUtils.onTab(ev, editorState, 4)
        const block = newEditorState.getCurrentContent().getBlockForKey(KEY0)
        expect(block.getDepth()).toBe(0)
      })

      it('is not list block before current block', () => {
        const KEY0 = '0'
        const KEY1 = '1'
        const content = ContentState.createFromBlockArray([
          new ContentBlock({ key: KEY0, type: 'unstyled' }),
          new ContentBlock({ key: KEY1, type: CHECKABLE_LIST_ITEM, data: Map({ checked: false }) }),
        ])
        let editorState = EditorState.createWithContent(content)

        const ev = Object.assign({}, baseMockEvent)
        editorState = moveSelectionToEnd(editorState)
        const newEditorState = CheckableListItemUtils.onTab(ev, editorState, 4)
        expect(editorState).toBe(newEditorState)
      })

      it('Max depth', () => {
        const KEY0 = '0'
        const KEY1 = '1'
        const content = ContentState.createFromBlockArray([
          new ContentBlock({ key: KEY0, type: CHECKABLE_LIST_ITEM, data: Map({ checked: false }) }),
          new ContentBlock({ key: KEY1, type: CHECKABLE_LIST_ITEM, data: Map({ checked: true }) }),
        ])
        let editorState = EditorState.createWithContent(content)

        const ev = Object.assign({}, baseMockEvent)
        editorState = moveSelectionToEnd(editorState)
        let newEditorState = CheckableListItemUtils.onTab(ev, editorState, 4)
        newEditorState = CheckableListItemUtils.onTab(ev, newEditorState, 1)
        const block = newEditorState.getCurrentContent().getBlockForKey(KEY1)
        expect(block.getDepth()).toBe(1)
      })

      it('is not collpsed', () => {
        const KEY0 = '0'
        const KEY1 = '1'
        const length = 2
        const content = ContentState.createFromBlockArray([
          new ContentBlock({ key: KEY0, type: CHECKABLE_LIST_ITEM, data: Map({ checked: false }) }),
          new ContentBlock({ key: KEY1, type: CHECKABLE_LIST_ITEM, data: Map({ checked: true }) }),
        ])
        let editorState = EditorState.createWithContent(content)

        const ev = Object.assign({}, baseMockEvent)
        editorState = moveSelectionToEnd(editorState)
        const selection = new SelectionState({
          anchorKey: KEY0,
          anchorOffset: length,
          focusKey: KEY1,
          focusOffset: length,
        })
        editorState = EditorState.acceptSelection(editorState, selection)
        let newEditorState = CheckableListItemUtils.onTab(ev, editorState, 4)
        const block = newEditorState.getCurrentContent().getBlockForKey(KEY1)
        expect(block.getDepth()).toBe(0)
      })
    })
  })
})
