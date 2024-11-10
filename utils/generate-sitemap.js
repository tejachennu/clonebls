import { globby } from 'globby';  // Correct way to import globby
import fs from 'fs';
async function generateSitemap() {
//   const pages = await globby(['pages/**/*{.jsx,.mdx}', 'pages/_*.jsx', 'pages/api']);
    const pages = await globby(['UIserver/**/*.jsx']);  // Only .jsx files
    console.log(pages);
//   const page = await globby(['pages/**/*{.js,.mdx}', '!pages/_*.js', '!pages/api']);
  console.log(pages);
  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map((page) => {
          const path = page
            .replace('pages', '')
            .replace('.js', '')
            .replace('.mdx', '');
          const route = path === '/index' ? '' : path;

          return `
            <url>
              <loc>${`http://localhost:3000${route}`}</loc>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  // Write the sitemap to the public folder
  fs.writeFileSync('UIserver/public/sitemap.xml', sitemap);
}

generateSitemap();
