import { GetStaticProps } from "next"
import Head from "next/head"
import { getPrismicClient } from "../../services/prismic"
import styles from "./styles.module.scss"
import { RichText } from "prismic-dom"
import Link from "next/link"

type Post = {
  slug: string,
  title: string
  excerpt: string
  updatedAt: string
}

interface PostProps {
  posts: Post[]
}

export default function Posts({ posts }: PostProps) {
  return(
    <>
      <Head>
        <title>Posts | ignews</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.posts}>
          { posts.map(post => (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <a>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.getAllByType("post", {fetch: ["title", "content"], pageSize: 100})

 const posts = response.map(post => {
      return {
        slug: post.uid,
        title: RichText.asText(post.data.title),
        excerpt: post.data.content.map(content => {
          if (content.type === "paragraph") {
            return content.text
          }
        })[0] ?? "",
        updatedAt: new Date(post.last_publication_date).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric"
        })
      }
    })


  return {
    props: {
      posts
    }
  }
}