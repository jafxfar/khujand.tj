'use client'

import Script from 'next/script'
import { gismeteoInformerHash } from '@/data/home'

const INFORMER_ID = `gsInformerID-${gismeteoInformerHash}`
const INFORMER_JS = `https://www.gismeteo.ru/api/informer/getinformer/?hash=${gismeteoInformerHash}`

export const GismeteoInformer = () => {
  return (
    <>
      {/* Gismeteo informer START */}
      <div
        id={INFORMER_ID}
        className="gsInformer"
        style={{
          width: 206,
          height: 'auto',
          fontFamily: 'Arial',
          border: '1px solid rgb(210, 232, 255)',
        }}
      >
        <div className="gsIContent">
          <div id="gs-moduleCurrentBlock" />
          <div id="gs-moduleForecastBlock" />
          <div id="gs-moduleTourismBlock" />
          <div className="gsLinks" style={{ backgroundColor: 'rgb(255, 255, 255)' }}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <div className="leftCol">
                      <a href="https://www.gismeteo.ru" target="_blank" rel="noreferrer">
                        <span>
                          <b className="gis-blue">Gis</b>
                          <b>meteo</b>
                        </span>
                      </a>
                    </div>
                    <div className="rightCol">
                      <a href="https://www.gismeteo.ru/" target="_blank" rel="noreferrer">
                        Прогноз на 2 недели
                      </a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Script src={INFORMER_JS} strategy="afterInteractive" />
      {/* Gismeteo informer END */}
    </>
  )
}
