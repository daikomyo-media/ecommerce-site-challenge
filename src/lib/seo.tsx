import { Helmet } from 'react-helmet-async'

export function Seo({ title, description }: { title: string; description?: string }) {
  const fullTitle = title ? `${title} | Great Commerce` : 'Great Commerce'
  return (
    <Helmet>
      <title>{fullTitle}</title>
      {description ? <meta name="description" content={description} /> : null}
    </Helmet>
  )
}
