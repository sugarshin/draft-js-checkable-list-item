import { CHECKABLE_LIST_ITEM } from './constants'
import type ContentBlock from 'draft-js/lib/ContentBlock'

export default function blockStyleFn(block: ContentBlock): ?string {
  if (block.getType() === CHECKABLE_LIST_ITEM) {
    return CHECKABLE_LIST_ITEM
  }
}
