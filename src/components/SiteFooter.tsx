type FooterData = {
  title: string
  lines: string[]
  phone: string
  email: string
  site: string
  siteHref: string
  phoneFaxLabel: string
  emailLabel: string
  banners: { href: string; image: string; alt: string }[]
  copyright: string
  copyrightHref: string
  copyrightLinkText: string
}

type SiteFooterProps = {
  footer: FooterData
}

export const SiteFooter = ({ footer }: SiteFooterProps) => {
  return (
    <div id="page-footer">
      <div className="wrapper">
        <div id="footer">
          <a className="anchor" href="#page" aria-label="Top" />
          <table className="mceItemTable" style={{ border: 0 }}>
            <tbody>
              <tr>
                <td style={{ color: '#ffffff' }}>
                  <h3
                    style={{
                      fontSize: 20,
                      margin: '0px 0px 8px',
                      padding: '10px 0px 0px',
                      lineHeight: 1.2,
                      fontFamily: "'Palatino Linotype'",
                      overflow: 'hidden',
                      color: '#ffffff',
                      borderTopLeftRadius: 8,
                      borderTopRightRadius: 8,
                      textShadow: 'rgba(0, 0, 0, 0.6) -1px -1px 0px',
                      textAlign: 'justify',
                    }}
                  >
                    <span>{footer.title}</span>
                  </h3>
                  <div
                    style={{
                      fontFamily: "'Palatino Linotype'",
                      fontSize: 13,
                      lineHeight: '19px',
                      color: 'rgb(40, 51, 214)',
                      textAlign: 'justify',
                      paddingLeft: 30,
                    }}
                  >
                    <strong>
                      <span style={{ fontSize: 'medium', color: '#ffffff' }}>{footer.lines[0]}</span>
                    </strong>
                  </div>
                  <div
                    style={{
                      fontFamily: "'Palatino Linotype'",
                      fontSize: 13,
                      lineHeight: '19px',
                      color: 'rgb(40, 51, 214)',
                      textAlign: 'justify',
                      paddingLeft: 30,
                    }}
                  >
                    <br />
                    <strong>
                      <span style={{ fontSize: 'medium', color: '#ffffff' }}>{footer.lines[1]}</span>
                    </strong>
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      lineHeight: '19px',
                      color: 'rgb(255, 255, 255)',
                      textAlign: 'justify',
                    }}
                  >
                    <br />
                    <span style={{ color: 'rgb(255, 255, 255)' }}>
                      <span style={{ fontSize: 'medium', lineHeight: '20px', fontWeight: 'bold' }}>
                        &nbsp; &nbsp; &nbsp; &nbsp; {footer.phoneFaxLabel}{' '}
                        <strong>{footer.phone}</strong>
                      </span>
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      lineHeight: '19px',
                      color: 'rgb(40, 51, 214)',
                      textAlign: 'justify',
                      paddingLeft: 30,
                    }}
                  >
                    <br />
                    <strong>
                      <span style={{ fontSize: 'medium' }}>
                        <a href={footer.siteHref}>
                          <span style={{ color: 'rgb(255, 255, 255)' }}>{footer.site}</span>
                        </a>
                        <span style={{ color: 'rgb(255, 255, 255)' }}>, </span>
                        <span style={{ color: 'rgb(255, 255, 255)', fontSize: '12pt' }}>
                          {footer.emailLabel}{' '}
                        </span>
                        <a href={`mailto:${footer.email}`}>
                          <span style={{ color: 'rgb(255, 255, 255)', fontSize: '12pt' }}>
                            {footer.email}
                          </span>
                        </a>
                      </span>
                    </strong>
                  </div>
                  <div
                    style={{
                      fontFamily: "'Palatino Linotype'",
                      fontSize: 13,
                      lineHeight: '19px',
                      color: '#2833d6',
                      textAlign: 'justify',
                    }}
                  >
                    <p>
                      <br />
                    </p>
                  </div>
                </td>
                <td>
                  <p>
                    <br />
                  </p>
                  <a href={footer.banners[0].href} target="_blank" rel="noreferrer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={footer.banners[0].image}
                      alt={footer.banners[0].alt}
                      title={footer.banners[0].alt}
                      width={150}
                      height={105}
                      style={{ border: 0 }}
                    />
                  </a>
                  <p>
                    <br />
                  </p>
                </td>
                <td>
                  <p>
                    <br />
                  </p>
                  <blockquote>
                    <a href={footer.banners[1].href} target="_blank" rel="noreferrer">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={footer.banners[1].image}
                        alt={footer.banners[1].alt}
                        title={footer.banners[1].alt}
                        width={150}
                        height={105}
                        style={{ border: 0 }}
                      />
                    </a>
                    <p>
                      <br />
                    </p>
                  </blockquote>
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            <span style={{ color: 'rgb(255, 255, 255)' }}>
              <span style={{ fontSize: 14, lineHeight: '21px', textAlign: 'center' }}>
                {footer.copyright}{' '}
              </span>
              <a
                href={footer.copyrightHref}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: 'initial',
                  fontSize: 14,
                  lineHeight: '21px',
                  textAlign: 'center',
                }}
              >
                {footer.copyrightLinkText}
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
