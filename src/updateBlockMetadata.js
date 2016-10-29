import EditorState from 'draft-js/lib/EditorState'

/**
 * @param {EditorState} editorState
 * @param {String} blockKey
 * @param {} metadata
 * @returns {EditorState} New editorState.
 */
export default function updateBlockMetadate(
  editorState: EditorState,
  blockKey: string,
  metadata: object
): EditorState {
  const contentState = editorState.getCurrentContent()
  const updatedBlock = contentState
    .getBlockForKey(blockKey)
    .mergeIn(['data'], metadata)
  const blockMap = contentState.getBlockMap().merge({ [blockKey]: updatedBlock })
  return EditorState.push(editorState, contentState.merge({ blockMap }), 'metadata-update')
}
