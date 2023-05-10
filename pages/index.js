import Head from 'next/head';
import Link from 'next/link';
import { format } from 'date-fns';
import Layout from '../components/layout';
import DateString from '../components/date';
import { getSortedPostsData } from '../lib/posts';
import utilStyles from '../styles/utils.module.css';


const t = new Date();
const today = <time dateTime={t.toISOString()}>{format(t, 'MMMM d, yyyy')}</time>

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  };
}

export default function Home({ allPostsData }) {
  console.log('Index render');
  return (
    <Layout home>
      <Head>
        <title>Demo Blog</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hello I'm <strong>Jessica</strong>. I'm a Full-Stack Developer at 13
          Down Software Inc. You can find my contact information on{' '}
          <a href="https://github.com/jessicarush">GitHub</a>.
        </p>
        <p>
          This is a sample website - you can build a site like this by following
          <a href="https://nextjs.org/learn"> the Next.js tutorial</a>.
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link><br />
              <small className={utilStyles.lightText}>
                <DateString dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>

      <footer>
        <p className="test">Last updated {today}</p>
      </footer>

      <style jsx>{`
        footer {
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .test {
          font-size: 12px;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Roboto',
            'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
            'Helvetica Neue', sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </Layout>
  );
}
