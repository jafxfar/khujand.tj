import type { NewsItem } from '@/data/i18n/home'
import type { UiStrings } from '@/data/i18n/ui'

type MainNewsProps = {
  items: NewsItem[]
  ui: UiStrings
}

export const MainNews = ({ items, ui }: MainNewsProps) => {
  if (!items.length) return null

  const [leading, ...rest] = items

  const renderItem = (item: NewsItem) => (
    <div className="item " key={item.href}>
      <div className="item-bg">
        <div className="headline">
          <h1 className="title">
            <a href={item.href}>{item.title}</a>
          </h1>
          <div className="icons" />
        </div>
        <p className="articleinfo">
          <span className="created">{item.date}</span>
          <br />
        </p>
        <p style={{ textAlign: 'justify' }}>
          {item.image ? (
            <a
              style={{ float: 'left', marginRight: 8 }}
              className="thumbnail with-zoomin-img zoomin-cur"
              href={item.image}
              target="_blank"
              rel="noreferrer"
              title={item.title}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.title} width={200} height={133} style={{ float: 'left' }} />
              <span className="zoomin-img" />
            </a>
          ) : null}
          {item.excerpt}
        </p>
        <div className="jcomments-links">
          <a className="readmore-link" href={item.href} title={item.title}>
            {ui.readMore}
          </a>
          <a href={`${item.href}#addcomments`} className="comments-link">
            {ui.comment}
          </a>
        </div>
      </div>
    </div>
  )

  return (
    <div id="content">
      <div id="content-shift">
        <div className="floatbox">
          <div className="joomla ">
            <div className="blog">
              <h1 className="pagetitle">{ui.home} </h1>

              <div className="leadingarticles">{renderItem(leading)}</div>

              <div className="teaserarticles multicolumns">
                {rest.map((item, index) => (
                  <div
                    key={item.href}
                    className={`${index % 2 === 0 ? 'first' : 'last'} float-left width50`}
                  >
                    {renderItem(item)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
