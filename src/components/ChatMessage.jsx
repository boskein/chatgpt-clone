import React from 'react'
import { MdComputer, MdPersonOutline } from 'react-icons/md'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from 'remark-gfm'
import { format } from 'timeago.js'

const ChatMessage = (props) => {
  const { id, createdAt, text, ai = false } = props.message

  return (
    <div key={id} className={`${ai && 'flex-row-reverse'} message`}>
      <div className='message__wrapper'>
        <ReactMarkdown className='message__markdown'
          children={text}
          remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || 'language-js')
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, '')}
                  style={atomDark} language={match[1]} PreTag="div" {...props}
                />
              ) : (<code className={className} {...props}>{children} </code>)
            }
          }} />


        <div className='message__createdAt'>{format(createdAt)}</div>
      </div>

      <div className="message__pic">
        {ai ? <MdComputer /> : <MdPersonOutline />}
      </div>
    </div>
  )
}

export default ChatMessage