import React from 'react'
import { DiscussionProvider } from '../discussionBoardContext/discussionContext'
import { CreateDiscussion } from '..'

export const DiscussionBoardCreateDiscussion = () => {
  return (
    <>
    <DiscussionProvider>
        <CreateDiscussion/>
    </DiscussionProvider>
    </>
  )
}
