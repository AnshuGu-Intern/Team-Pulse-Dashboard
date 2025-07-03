import React from "react";
import { Helmet } from "react-helmet-async";

const Seo = ({
  title = "Team Pulse Dashboard",
  description = "A productivity monitoring and task management tool for internal teams.",
  image = "/team-pulse-og-image.png",
  url,
}) => {
  const baseUrl = window.location.origin;

  const pageUrl = url || window.location.href;

  const absoluteImageUrl = new URL(image, baseUrl).href;

  return (
    <Helmet>
      {/* Basic SEO Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph / Social Media Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImageUrl} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImageUrl} />

      {/* Standard HTML Head Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
    </Helmet>
  );
};

export default Seo;
