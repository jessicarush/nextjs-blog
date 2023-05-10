/*
 * fs is a Node.js module that let's you read files from the file system.
 * path is a Node.js module that let's you manipulate file paths.
 * matter is a library that let's you parse YAML metadata in each markdown file.
 * In Next.js, the lib folder does not have an assigned name like the pages folder,
 * so you can name it anything. It's usually convention to use lib or utils.
 *
 * If you use fs, be sure it's only within Static Generation (getStaticProps),
 * Server-side rendering (getServerSideProps or getInitialProps(legacy)).
 * Or getStaticPaths.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

// const databaseClient = someDatabaseSDK.createClient(...);

export function getSortedPostsData() {
  // Instead of the file system, you could be
  // fetching data from an external API endpoint
  // const res = await fetch('..');
  // return res.json();
  // ...or fetch data from a database
  // return databaseClient.query('SELECT posts...')

  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => a.date < b.date ? 1 : -1);
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}

export function getAllPostIds() {
  // Returns an array that looks like this:
  // [
  //   { params: { id: 'ssg-ssr' }},
  //   { params: { id: 'pre-rendering' }}
  // ]
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

