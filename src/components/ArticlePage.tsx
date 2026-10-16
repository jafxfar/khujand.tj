import { ArticleView } from '@/components/ArticleView'
import { PageShell } from '@/components/PageShell'
import type { SiteArticle } from '@/data/i18n/articles/types'
import { getHomeContentFromDb } from '@/lib/content/home'
import type { Locale } from '@/lib/i18n'

type ArticlePageProps = {
  lang: Locale
  article: SiteArticle
}

export const ArticlePage = async ({ lang, article }: ArticlePageProps) => {
  const content = await getHomeContentFromDb(lang)

  return (
    <PageShell lang={lang} content={content} crumbs={article.crumbs}>
      <ArticleView
        title={article.title}
        date={article.date}
        slug={article.slug}
        lang={lang}
        image={article.image}
        imageAlt={article.imageAlt || article.title}
        imageWidth={article.imageWidth}
        imageHeight={article.imageHeight}
        roleTitle={article.roleTitle}
        paragraphs={article.paragraphs}
        rating={article.rating}
        ui={content.ui}
      />
    </PageShell>
  )
}
