import Card from '../Card'
import Icon from '../Icon'
import { latestPosts } from './data'

export default function LatestPosts() {
  return (
    <Card title="Latest posts">
      <div className="grid gap-x-8 gap-y-5 xl:grid-cols-2">
        {latestPosts.map((p) => (
          <article key={p.title} className="flex flex-col gap-3 sm:flex-row">
            <a
              href="#"
              className="relative flex h-20 w-full shrink-0 items-center justify-center rounded bg-lt-grey-400 text-white sm:w-28"
            >
              <Icon name="play3" className="text-3xl" />
            </a>
            <div>
              <h6 className="font-medium">
                <a href="#">{p.title}</a>
              </h6>
              <div className="mb-2 text-lt-muted">
                <Icon name="book-play" className="mr-2" />
                {p.category}
              </div>
              {p.excerpt}
            </div>
          </article>
        ))}
      </div>
    </Card>
  )
}
