type BlogItem = {
  title: string
  href: string
  image?: string
  excerpt: string
  date?: string
}

type CategoryBlogViewProps = {
  pageTitle: string
  items: BlogItem[]
  readMoreLabel: string
}

export const CategoryBlogView = ({ pageTitle, items, readMoreLabel }: CategoryBlogViewProps) => {
  if (!items.length) return null

  return (
    <div id="content">
      <div id="content-shift">
        <div className="floatbox">
          <div className="joomla ">
            <div className="blog">
              <h1 className="pagetitle">{pageTitle}</h1>

              <div className="leadingarticles">
                {items.map((item) => (
                  <div className="item " key={item.href}>
                    <div className="item-bg">
                      <div className="headline">
                        <h1 className="title">
                          <a href={item.href}>{item.title}</a>
                        </h1>
                        <div className="icons" />
                      </div>
                      {item.date ? (
                        <p className="articleinfo">
                          <span className="created">{item.date}</span>
                          <br />
                        </p>
                      ) : null}
                      <p style={{ textAlign: 'justify' }}>
                        {item.image ? (
                          <a
                            style={{ float: 'left', marginRight: 8 }}
                            className="thumbnail"
                            href={item.href}
                            title={item.title}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.image}
                              alt={item.title}
                              width={150}
                              height={200}
                              style={{ float: 'left' }}
                            />
                          </a>
                        ) : null}
                        {item.excerpt}
                      </p>
                      <div className="jcomments-links">
                        <a className="readmore-link" href={item.href} title={item.title}>
                          {readMoreLabel}
                        </a>
                      </div>
                    </div>
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
