import React from 'react'
import Skeleton from 'react-loading-skeleton'


const ClubPostCommentSkeleton = () => {
    let count  = [1,2]
  return (
    <>
       {
            count.map((c)=>{
                return (
                    <>
                    <div className='d-flex'>
                        <div className='me-3'>
                            <Skeleton  height={40} width={40} circle={true} />
                        </div>
                        <div>
                            <Skeleton count={3} width={300} height={10}  style={{ marginBottom: '10px' }} />
                        </div>
                    </div>
                    <hr/>
                    </>
                )
            })
       }
    </>
  )
}

export default ClubPostCommentSkeleton
