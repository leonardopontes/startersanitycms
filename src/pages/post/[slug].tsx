import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'

import Container from '~/components/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import { getPost, type Post, postBySlugQuery, postSlugsQuery} from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import { formatDate } from '~/utils'
// interface Consulta {
interface Query {
  // [chave: string]: string
  [key: string]: string
}
// pegarPropriedadeEstática: PegarPropriedadeEstática<
export const getStaticProps: GetStaticProps<
  // CompartilharPropriedadePágina & {
  SharedPageProps & {
    post: Post
  },
  // Consulta
  Query
// > = assíncrona ({ Modorascunho = falso, parametros = {} }) contendo => {  
> = async ({ draftMode = false, params = {} }) => {
  // client ligando a = pegarClient(Modorascunho ? { token: lerToken } : indefinido)
  const client = getClient(draftMode ? { token: readToken } : undefined)
  // post ligando a = aguardar pegarPost(client, parametros.slug)
  const post = await getPost(client, params.slug)
  // Se (!post) { for verdade
  if (!post) {
    // retornar {
    return {
      // nãoEncontrado: verdade,
      notFound: true,
    }
  }
  // retornar {
  return {
    // propriedades: {
    props: {
      // Modorascunho,
      draftMode,
      // token: Modorascunho ? lerToken : '',
      token: draftMode ? readToken : '',
      post,
    },
  }
}
// RotaProjetoSlug(
export default function ProjectSlugRoute(
  // propriedades: InferirPegandoTiposPropriedadesEstáticas<tipode pegarPropriedadesEstáticas>,
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  // [post] ligando a = usarConsultaAoVivo(propriedades.post, postPorConsultaSlug, {
  const [post] = useLiveQuery(props.post, postBySlugQuery, {
    // slug: propriedades.post.atual.slug
    slug: props.post.slug.current,
  })

  return (
    <Container>
      <section className="post">
        {post.mainImage ? (
          <Image
            className="post__cover"
            src={urlForImage(post.mainImage).url()}
            height={462}
            width={734}
            alt=""
          />
        ) : (
          <div className="post__cover--none" />
        )}
        <div className="post__container">
          <h1 className="post__title">{post.title}</h1>
          <p className="post__excerpt">{post.excerpt}</p>
          <p className="post__date">{formatDate(post._createdAt)}</p>
          <div className="post__content">
            <PortableText value={post.body} />
          </div>
        </div>
      </section>
    </Container>
  )
}
// pegarCaminhosEstáticos ligando a = função assíncrona () contendo => {
export const getStaticPaths = async () => {
  // client ligando a = pegarClient()
  const client = getClient()
  // slugs ligando a = aguardar buscar.client(ConsultarpostSlugs)
  const slugs = await client.fetch(postSlugsQuery)
  // retornar {
  return {
    // caminhos: slugs?.map(({ slug }) => `/post/${slug}`) || [],
    paths: slugs?.map(({ slug }) => `/post/${slug}`) || [],
    // cair de volta: 'bloqueando',
    fallback: 'blocking',
  }
}
