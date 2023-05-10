import Head from 'next/head';
import Script from 'next/script';
import { getAllPostIds, getPostData } from '../../lib/posts';
import DateString from '../../components/date';
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';


export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // We need to await here because we are using async/await in getPostData
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <Script
        src="/js/myscript.js"
        strategy="beforeInteractive"
        onLoad={() =>
          console.log(`script loaded`)
        }
      />

      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <DateString dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export default Post;