import Card from '../Card'
import Icon from '../Icon'
import { latestPosts, type Post } from './data'

function PostItem({ p }: { p: Post }) {
  return (
    <div className="media flex-column flex-sm-row mt-0 mb-3">
      <div className="mr-sm-3 mb-2 mb-sm-0">
        <div className="card-img-actions">
          <a href="#" onClick={(e) => e.preventDefault()}>
            <span
              className="d-flex align-items-center justify-content-center rounded bg-grey-400 text-white"
              style={{ width: 120, height: 80 }}
            >
              <Icon name="play3" className="icon-2x" />
            </span>
          </a>
        </div>
      </div>

      <div className="media-body">
        <h6 className="media-title">
          <a href="#" onClick={(e) => e.preventDefault()}>
            {p.title}
          </a>
        </h6>
        <ul className="list-inline list-inline-dotted text-muted mb-2">
          <li className="list-inline-item">
            <Icon name="book-play" className="mr-2" /> {p.category}
          </li>
        </ul>
        {p.excerpt}
      </div>
    </div>
  )
}

export default function LatestPosts() {
  const half = Math.ceil(latestPosts.length / 2)
  const columns = [latestPosts.slice(0, half), latestPosts.slice(half)]

  return (
    <Card title="Latest posts" tools={["collapse", "reload", "remove"]} bodyClassName="card-body pb-0">
      <div className="row">
        {columns.map((col, i) => (
          <div key={i} className="col-xl-6">
            {col.map((p) => (
              <PostItem key={p.title} p={p} />
            ))}
          </div>
        ))}
      </div>
    </Card>
  )
}
