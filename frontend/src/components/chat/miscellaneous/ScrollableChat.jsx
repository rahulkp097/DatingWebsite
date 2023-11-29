import React from 'react'
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from '../../../Context/ChatProvider';
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../../config/ChatLogics';
import { formatDistanceToNow } from 'date-fns';

function ScrollableChat({messages}) {
      const { user } = ChatState();
  return (
    <ScrollableFeed>
{messages &&
  messages.map((m, i) => (
    <div key={m._id} style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {(isSameSender(messages, m, i, user._id) ||
          isLastMessage(messages, i, user._id)) && (
          <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
            <Avatar
              mt="7px"
              mr={1}
              size="sm"
              cursor="pointer"
              name={m.sender.name}
              src={m.sender.pic}
            />
          </Tooltip>
        )}
        <span
          style={{
            backgroundColor: `${
              m.sender._id === user._id ? '#BEE3F8' : '#B9F5D0'
            }`,
            marginLeft: isSameSenderMargin(messages, m, i, user._id),
            marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
            borderRadius: '20px',
            padding: '5px 15px',
            maxWidth: '75%',
          }}
        >
          {m.content}
        </span>
      </div>

      <div
        style={{
          alignSelf: m.sender._id === user._id ? 'flex-end' : 'flex-start',
          color: '#666',
          fontSize: '0.8rem',
          marginTop: '4px', // Adjust the margin-top as needed
        }}
      >
        {formatDistanceToNow(new Date(m.createdAt), { addSuffix: true })}
      </div>
    </div>
  ))}

  </ScrollableFeed>
  )
}

export default ScrollableChat