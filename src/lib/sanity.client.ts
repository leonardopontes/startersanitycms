import { createClient, type SanityClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '~/lib/sanity.api'
// pegarCliente(visualizar?: { token: string }): ClientSanity {
export function getClient(preview?: { token: string }): SanityClient {
  // client ligando a = criarClient({
  const client = createClient({
    // Id do projeto,
    projectId,
    // conjunto de dados,
    dataset,
    // Versão api,
    apiVersion,
    // usar Cdn,
    useCdn,
    // perspectiva: 'publicado',
    perspective: 'published',
  })
  // Se (visualização) { for verdade
  if (preview) {
    // Se (!visualização.token) { for verdade
    if (!preview.token) {
      // lançar novo Erro('Você deve fornecer um token para visualizar os rascunhos')
      throw new Error('You must provide a token to preview drafts')
    }
    // retornar client.comConfiguração({
    return client.withConfig({
      // token: visualização.token,
      token: preview.token,
      // usarCdn: falso,
      useCdn: false,
      // ignorarAvisoTokenBrowser: verdade,
      ignoreBrowserTokenWarning: true,
      // perspectiva: 'visualizarRascunhos',
      perspective: 'previewDrafts',
    })
  }
  // retornar cliente
  return client
}
