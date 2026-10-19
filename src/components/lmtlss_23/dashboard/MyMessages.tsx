import { useState } from 'react'
import Avatar from '../Avatar'
import { Badge } from '../Badge'
import Card from '../Card'
import Icon from '../Icon'
import MessagesArea from '../charts/MessagesArea'
import { messageTabs, messageStats, type ChatMessage } from './data'

function MessageItem({ m }: { m: ChatMessage }) {
  return (
    <li className="media">
      <div className={`mr-3 ${m.unread ? 'position-relative' : ''}`.trim()}>
        <Avatar name={m.name} size={36} />
        {m.unread && <span className="badge bg-danger-400 badge-pill badge-float border-2 border-white">{m.unread}</span>}
      </div>

      <div className="media-body">
        <div className="d-flex justify-content-between">
          <a href="#" onClick={(e) => e.preventDefault()}>
            {m.name}
          </a>
          <span className="font-size-sm text-muted">{m.time}</span>
        </div>
        {m.text}
      </div>
    </li>
  )
}

export default function MyMessages() {
  const [active, setActive] = useState(messageTabs[0].key)
  const tab = messageTabs.find((t) => t.key === active) ?? messageTabs[0]

  return (
    <Card
      title="My messages"
      bodyClassName=""
      actions={
        <>
          <span>
            <Icon name="history" className="text-warning mr-2" /> Jul 7, 10:30
          </span>
          <Badge color="success" className="align-self-start ml-3">
            Online
          </Badge>
        </>
      }
    >
      {/* Numbers */}
      <div className="card-body py-0">
        <div className="row text-center">
          {messageStats.map((s) => (
            <div key={s.label} className="col-4">
              <div className="mb-3">
                <h5 className="font-weight-semibold mb-0">{s.value}</h5>
                <span className="text-muted font-size-sm">{s.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <MessagesArea seed={8} />

      {/* Tabs */}
      <ul className="nav nav-tabs nav-tabs-solid nav-justified bg-indigo-400 border-x-0 border-bottom-0 border-top-indigo-300 mb-0">
        {messageTabs.map((t) => (
          <li key={t.key} className="nav-item">
            <a
              href="#"
              className={`nav-link font-size-sm text-uppercase ${t.key === active ? 'active' : ''}`.trim()}
              onClick={(e) => {
                e.preventDefault()
                setActive(t.key)
              }}
            >
              {t.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Tab content */}
      <div className="tab-content card-body">
        <div className="tab-pane fade show active">
          <ul className="media-list">
            {tab.messages.map((m) => (
              <MessageItem key={m.name} m={m} />
            ))}
          </ul>
        </div>
      </div>
    </Card>
  )
}
