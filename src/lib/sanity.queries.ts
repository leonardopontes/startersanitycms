import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug } from '@sanity/types'
import groq from 'groq'
import { type SanityClient } from 'next-sanity'
// Consultarposts ligando a = groq`*[_tipo == "post" && definido(slug.atual)] ou ordem(_criadoEm desc)`
export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`
// pegarPosts(client: SanityClient): Promessa<Post[]> {
export async function getPosts(client: SanityClient): Promise<Post[]> {
  // aguardar buscar.client(Consultarposts)
  return await client.fetch(postsQuery)
}
// Consulta de post Por Slug ligando a = groq`*[_tipo == "post" && slug.atual == $slug][0]`
export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]`
// pegarPost(
export async function getPost(
  client: SanityClient,
  slug: string,
): Promise<Post> {
  // retornar aguardar buscar.client(ConsultadepostPorSlug, {
  return await client.fetch(postBySlugQuery, {
    // slug,
    slug,
  })
}
// Consulta de post Slugs = groq`*[_tipo == "post" && definido(slug.atual)][].slug.atual`
export const postSlugsQuery = groq`*[_type == "post" && defined(slug.current)][].slug.current`
// interface de Post {
export interface Post {
  _type: 'post'
  _id: string
  _createdAt: string
  title?: string
  slug: Slug
  // exceto?: string
  excerpt?: string
  // Imagemprincipal?: ImagemAtiva
  mainImage?: ImageAsset
  // corpo: BlocoDeTextoPortátil[]
  body: PortableTextBlock[]
}
