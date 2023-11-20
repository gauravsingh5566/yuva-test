import React from 'react'
import { DiscussionProvider } from '../discussionBoardContext/discussionContext'
import { MainDiscussionBoard } from '..'

export const DiscussionBoardMain = () => {
  return (
    <>
    <DiscussionProvider>
        <MainDiscussionBoard />
    </DiscussionProvider>
    </>
  )
}
