import Head from "next/head";
import axios from "axios";
import { apiToken } from "@/API/PostService";

import "./article.scss";

export interface ArticlePageProps {
  webPublicationDate: Date;
  webTitle: string;
  webUrl: string;
  fields: {
    body: string;
  };
}

export default function Home(props: ArticlePageProps) {
  const formatedDate = new Date(props.webPublicationDate).toDateString();

  return (
    <>
      <Head>
        <title>{`News Parser | ${props.webTitle}`}</title>
        <meta name="title" content={props.webTitle}></meta>
      </Head>
      <div className="app">
        <main>
          <div className="head">
            <h1 className="lead">{props.webTitle}</h1>
            <span className="secondary">{formatedDate}</span>
            <br />
            <a href={props.webUrl}>Read on Guardian {">"}</a>
          </div>
          <div dangerouslySetInnerHTML={{ __html: props.fields.body }} />
        </main>
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const link = context.query?.id;

  const { data } = await axios.get(link, {
    params: {
      "api-key": apiToken,
      "show-fields": "body",
    },
  });

  const res = data.response.content;

  return {
    props: {
      ...res,
    },
  };
}
