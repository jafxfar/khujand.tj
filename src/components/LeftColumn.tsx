import { ModuleRounded } from '@/components/ModuleRounded'
import { LofScroller } from '@/components/LofScroller'
import { NspNews } from '@/components/NspNews'
import { GismeteoInformer } from '@/components/GismeteoInformer'
import type { HomeContent } from '@/data/i18n/home'
import type { Locale } from '@/lib/i18n'

type LeftColumnProps = {
  lang: Locale
  content: HomeContent
}

export const LeftColumn = ({ content }: LeftColumnProps) => {
  const { ui, mayor, deputies, leaders, decisionDetails, youtubeEmbed } = content

  return (
    <div id="left">
      <ModuleRounded title={ui.mayor} className="first ">
        <p style={{ textAlign: 'center' }}>
          <a href={mayor.href}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={mayor.image} alt={mayor.name} title={mayor.name} />
            <br />
          </a>
        </p>
        <h1
          style={{
            margin: 0,
            padding: 0,
            fontWeight: 'normal',
            fontSize: 18,
            lineHeight: '20px',
            color: 'rgb(6, 113, 173)',
            textShadow: 'rgb(255, 255, 255) 0px 1px 0px, rgb(170, 170, 170) 0px 2px 4px',
            textAlign: 'center',
          }}
        >
          <span style={{ textDecoration: 'none', color: 'rgb(6, 113, 173)', fontSize: 'medium' }}>
            <a href={mayor.href}>{mayor.name}</a>
          </span>
        </h1>
      </ModuleRounded>

      <ModuleRounded title={deputies.title}>
        <LofScroller id="lofarticlessroller230" items={deputies.items} />
      </ModuleRounded>

      <ModuleRounded title={leaders.title}>
        <LofScroller id="lofarticlessroller224" items={leaders.items} />
      </ModuleRounded>

      <ModuleRounded title={ui.decisions}>
        <NspNews items={decisionDetails} pageLabel={ui.page} />
      </ModuleRounded>

      <ModuleRounded title={ui.youtube}>
        <div style={{ textAlign: 'center' }}>
          <iframe
            width="200"
            height="150"
            src={youtubeEmbed}
            title="YouTube"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </ModuleRounded>

      <ModuleRounded title={ui.weather} className="last">
        <GismeteoInformer />
      </ModuleRounded>
    </div>
  )
}
