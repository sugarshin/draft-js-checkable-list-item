import { EditorState, ContentState, ContentBlock } from 'draft-js'
import updateBlockMetadata from '../src/updateBlockMetadata'

describe('updateBlockMetadata', () => {
  let editorState
  const KEY = '0'

  beforeEach(() => {
    const content = ContentState.createFromBlockArray([new ContentBlock({ key: KEY })])
    editorState = EditorState.createWithContent(content)
  })

  it('Add', () => {
    const newEditorState = updateBlockMetadata(editorState, KEY, { foo: 1 })
    const block = newEditorState.getCurrentContent().getBlockForKey(KEY)
    expect(block.getData().get('foo')).toBe(1)
  })

  it('Update', () => {
    let newEditorState = updateBlockMetadata(editorState, KEY, { foo: 1 })
    newEditorState = updateBlockMetadata(newEditorState, KEY, { foo: 2 })
    const block = newEditorState.getCurrentContent().getBlockForKey(KEY)
    expect(block.getData().get('foo')).toBe(2)
  })

  it('Remove', () => {
    let newEditorState = updateBlockMetadata(editorState, KEY, { foo: 1 })
    newEditorState = updateBlockMetadata(newEditorState, KEY, { foo: void 0 })
    const block = newEditorState.getCurrentContent().getBlockForKey(KEY)
    expect(block.getData().get('foo')).toBeUndefined()
  })

  it('Merge', () => {
    let newEditorState = updateBlockMetadata(editorState, KEY, { foo: 1 })
    newEditorState = updateBlockMetadata(newEditorState, KEY, { bar: 2 })
    const block = newEditorState.getCurrentContent().getBlockForKey(KEY)
    expect(block.getData().get('foo')).toBe(1)
    expect(block.getData().get('bar')).toBe(2)
  })
})
