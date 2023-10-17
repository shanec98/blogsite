// Credits to Divyansh Singh
// Twitter: @_brc_dd

import fs from 'node:fs/promises';
import matter from 'gray-matter';
import removeMd from 'remove-markdown';

const articles = await fs.readdir('./docs/articles');

const data = await Promise.all(
  articles.map(async (article) => {
    const file = matter.read(`./docs/articles/${article}`, {
      excerpt: true,
      excerpt_separator: '',
});
const { data, path } = file;

return {
...data,
path: path.replace('./docs/', '').replace(/\.md$/, '.html'),
};
})
);
await fs.writeFile('./data.json', JSON.stringify(data), 'utf-8');