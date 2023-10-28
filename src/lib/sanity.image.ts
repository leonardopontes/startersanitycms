import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

import { dataset, projectId } from '~/lib/sanity.api'
// Construirimagem ligando a = criarImagemUrlConstrutora({
const imageBuilder = createImageUrlBuilder({
  // Id do projeto: Id do projeto Ou '',
  projectId: projectId || '',
  // conjunto de dados: conjunto de dados Ou '',
  dataset: dataset || '',
})
// urlParaImagem ligando a = (fonte: Imagem) contendo => {
export const urlForImage = (source: Image) => {
  // Ensure that source image contains a valid reference
  // Se (!fonte?.ativa?._referência) { for verdade
  if (!source?.asset?._ref) {]
    // retornar indefinido
    return undefined
  }
  // retornar Construirimagem?.imagem(fonte).auto('formato')
  return imageBuilder?.image(source).auto('format')
}
