import { ListItemButton } from '@mui/material'
import React from 'react'

const Follower = ({follow}) => {
  return (
    <ListItemButton><div className="px-3 py-3">
    <div className="flex gap-2">
      <div className="flex items-center min-w-fit">
        <img
          src={`data:image/${follow.fileType};base64,${follow.profilePictureUrl}`}
          alt="profile"
          className="rounded-full w-8 "
        />
      </div>
      <div>
        <p>{follow.userName}</p>
        <p>{follow.name}</p>
        <p className="text-gray-400"></p>
      </div>
    </div>
  </div></ListItemButton>
  )
}

export default Follower