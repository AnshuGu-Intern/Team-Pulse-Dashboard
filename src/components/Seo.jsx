import { Helmet } from "react-helmet-async";

const Seo = ({
  title = "Team Pulse",
  description = "Team Pulse: A productivity monitoring and task management tool for internal teams.",
  name = "Team Pulse",
  type = "website",
  url = window.location.href,
  image = "/team-pulse-og-image.png",
  keywords = "team pulse, dashboard, productivity, task management, team lead, team member, react, redux toolkit, internal tool",
}) => {
  const absoluteImageUrl = new URL(image, window.location.origin).href;

  return (
    <Helmet>
      {/* Primary Meta Tags for SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImageUrl} />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImageUrl} />

      <meta name="author" content={name} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charset="utf-8" />
    </Helmet>
  );
};

export default Seo;
