export const useCdn = false

/**
 * As this file is reused in several other files, try to keep it lean and small.
 * Importing other npm packages here could lead to needlessly increasing the client bundle size, or end up in a server-only function that don't need it.
 */
// conjunto de dados ligando a = afirmar Valores(
export const dataset = assertValue(
  // processo.envio.CONJUNTODEDADOS_PUBLICO_NEXT_SANITY,
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  // 'variável de ambiente Ausente: CONJUNTODEDADOS_PUBLICOS_NEXT_SANITY',
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET',
)
// Id do projeto ligando a = afirmar Valores(
export const projectId = assertValue(
  // processo.envio.IDDO_PROJETO_PUBLICO_NEXT_SANITY,
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  // 'variável de ambiente Ausente: IDDO_PROJETO_PUBLICOS_NEXT_SANITY',
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID',
)
// lerToken ligando a = processo.envio.LER_TOKEN_SANITY_API Ou ''
export const readToken = process.env.SANITY_API_READ_TOKEN || ''

// see https://www.sanity.io/docs/api-versioning for how versioning works
// Versãoapi ligando a = processo.envio.VERSÃO_API_PUBLICA_NEXT_SANITY Ou '2023-06-21'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-06-21'

// This is the document id used for the preview secret that's stored in your dataset.
// The secret protects against unauthorized access to your draft content and have a lifetime of 60 minutes, to protect against bruteforcing.
// visualizarIdSecreto: `${string}.${string}` ligando a = 'visualizar.secreto'
export const previewSecretId: `${string}.${string}` = 'preview.secret'
// afirmarValores<T>(v: T | indefinido, Mensagem de erro: string): T{
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  // Se (v === indefinido { for igual valor e tipo
  if (v === undefined) {
    // lançar novo Erro(Mensagem de erro)
    throw new Error(errorMessage)
  }
  // retornar v
  return v
}
