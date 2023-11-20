import React from 'react'
import { DiscussionProvider } from '../discussionBoardContext/discussionContext'
import { DiscussionBoardChatRoom } from '..'

export const DiscussionBoardChatRooms = () => {
  return (
    <>
       <DiscussionProvider>
        <DiscussionBoardChatRoom/>
    </DiscussionProvider>
    </>
  )
}
