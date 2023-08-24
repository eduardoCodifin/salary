import Head from "next/head";

const DOMAIN = "https://calculadora-salario-neto-o-bruto.vercel.app/";
const DEFAULT_OG_IMAGE ="https://uploads-ssl.webflow.com/63b4bdea9865273fd745b3af/63b4bdea9865273cf545b3d1_Asset%206%403x.png";

export default function Seo({
  title = "Calculadora salarios Mexico: Bruto a Neto  ",
  description = "Calculadora de Impuestos México. Con esta calculadora podrás determinar tu sueldo neto o bruto, calculando tu salario después de aplicar los impuestos con las nuevas tarifas de ISR y del IMSS.",
  siteName = "Codifin",
  canonical = DOMAIN,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  twitterHandle = "@codifin",
}) {
  return (
    <Head>
      <title key="title">{`${siteName} – ${title}`}</title>
      <meta name="description" content={description} />
      <meta key="og_type" property="og:type" content={ogType} />
      <meta key="og_title" property="og:title" content={title} />
      <meta
        key="og_description"
        property="og:description"
        content={description}
      />
      <meta key="og_locale" property="og:locale" content="es_MX" />
      <meta key="og_site_name" property="og:site_name" content={siteName} />
      <meta key="og_url" property="og:url" content={canonical ?? DOMAIN} />
      <meta key="og_site_name" property="og:site_name" content={siteName} />
      <meta
        key="og_image"
        property="og:image"
        content={ogImage ?? DEFAULT_OG_IMAGE}
      />
      <meta
        key="og_image:alt"
        property="og:image:alt"
        content={`${title} | ${siteName}`}
      />
      <meta key="og_image:width" property="og:image:width" content="1200" />
      <meta key="og_image:height" property="og:image:height" content="630" />

      <meta name="robots" content="index,follow" />

      <meta
        key="twitter:card"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta
        key="twitter:site"
        name="twitter:site"
        content={twitterHandle}
      />
      <meta
        key="twitter:creator"
        name="twitter:creator"
        content={twitterHandle}
      />
      <meta key="twitter:title" property="twitter:title" content={title} />
      <meta
        key="twitter:description"
        property="twitter:description"
        content={description}
      />

      <link rel="canonical" href={canonical ?? DOMAIN} />

      <link rel="shortcut icon" href="https://uploads-ssl.webflow.com/63b4bdea9865273fd745b3af/63b4bdea986527b25c45b3e6_Asset%207%403x%201.png" />
    </Head>
  );
}
