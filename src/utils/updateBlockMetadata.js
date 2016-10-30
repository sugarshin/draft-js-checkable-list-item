import EditorState from 'draft-js/lib/EditorState'

/**
 * updateBlockMetadata
 *
 * @param {EditorState} editorState
 * @param {String} blockKey
 * @param {Object} metadata
 * @returns {EditorState} New editorState
 */
export default function updateBlockMetadata(
  editorState: EditorState,
  blockKey: string,
  metadata: object
): EditorState {
  const contentState = editorState.getCurrentContent()
  const updatedBlock = contentState.getBlockForKey(blockKey).mergeIn(['data'], metadata)
  const blockMap = contentState.getBlockMap().merge({ [blockKey]: updatedBlock })
  return EditorState.push(editorState, contentState.merge({ blockMap }), 'metadata-update')
}
