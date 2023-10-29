import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useLiveQuery } from 'next-sanity/preview'

import Card from '~/components/Card'
import Container from '~/components/Container'
import Welcome from '~/components/Welcome'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { getPosts, type Post, postsQuery } from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
// pegarPropriedadesEstática: PegarPropriedadesEstática<CompartilharPageProps & { posts: Post[] }> ligando a = função assíncrona ({ Modorascunho = falso }) contendo => {
export const getStaticProps: GetStaticProps<SharedPageProps & { posts: Post[] }> = async ({ draftMode = false }) => {
  // client = pegarClient(Modorascunho ? { token: lerToken } : indefinido)
  const client = getClient(draftMode ? { token: readToken } : undefined)
  // posts = aguardar pegarPosts(client)
  const posts = await getPosts(client)
  // retornar
  return {
    // propriedades: {
    props: {
      // Modorascunho,
      draftMode,
      // token: Modorascunho ? lerToken : '',
      token: draftMode ? readToken : '',
      posts,
    },
  }
}
// ÍndicePágina(
export default function IndexPage(
  // propriedades: InferirPegarTiposdePropriedadesEstáticas<tipode pegarPropriedadesEstáticas>,
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  // [posts] = usarConsultaAoVivo<Post[]>(propiedades.posts, Consultarposts)
  const [posts] = useLiveQuery<Post[]>(props.posts, postsQuery)
  return (
    <Container>
      <section>
        {posts.length ? (
          posts.map((post) => <Card key={post._id} post={post} />)
        ) : (
          <Welcome />
        )}
      </section>
    </Container>
  )
}
