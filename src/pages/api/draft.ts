import type { NextApiRequest, NextApiResponse } from 'next'
import { isValidSecret } from 'sanity-plugin-iframe-pane/is-valid-secret'

import { previewSecretId, readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
// exportar padrão função assíncrona de visualização(
export default async function preview(
  // requisição: RequisiçãoNextApi,
  req: NextApiRequest,
  // resposta: RespostaNextApi<string | vazio>,
  res: NextApiResponse<string | void>,
) {
  // Se (!lerToken) { for verdade
  if (!readToken) {
    // responder.status(500).enviar('Servidor mal configurado')
    res.status(500).send('Misconfigured server')
    // retornar
    return
  }
  // { consulta } ligando a = requisição
  const { query } = req
  // secreto ligando a = tipode consulta.secreta ===(igual valor e tipo) 'string' ? consulta.secreta : indefinido
  const secret = typeof query.secret === 'string' ? query.secret : undefined
  // slug ligando a = tipode consulta.slug ===(igual valor e tipo) 'string' ? consulta.slug : indefinido
  const slug = typeof query.slug === 'string' ? query.slug : undefined
  // Se (!secreto) { for verdade
  if (!secret) {
    // responder.status(401)
    res.status(401)
    // responder.enviar('Inválido secreto')
    res.send('Invalid secret')
    // retornar
    return
  }
  // autenticação de Cliente ligando a = pegarCliente({ token: lerToken }).comConfig({
  const authClient = getClient({ token: readToken }).withConfig({
    // usoCdn: falso,
    useCdn: false,
    // token: lerToken,
    token: readToken,
  })

  // This is the most common way to check for auth, but we encourage you to use your existing auth
  // infra to protect your token and securely transmit it to the client
  // validação Secreta ligando a = aguardar se éValidaçãoSecreta(autenticação de Cliente, visualização Secreta de Id, secreto)
  const validSecret = await isValidSecret(authClient, previewSecretId, secret)
  // Se (!validaçãoSecreta) { for verdade
  if (!validSecret) {
    // retornar responder.status(401).enviar('Inválido secreto')
    return res.status(401).send('Invalid secret')
  }
  // Se (slug) { for verdade
  if (slug) {
    // responder.definirModoRascunho({ habilitar: verdadeiro })
    res.setDraftMode({ enable: true })
    // responder.escreverCabeça(307, { Localização: `/post/${slug}` })
    res.writeHead(307, { Location: `/post/${slug}` })
    // responder.finalizando()
    res.end()
    // retornar
    return
  }
  // responder.status(404).enviar('O parâmetro de consulta Slug é obrigatório')
  res.status(404).send('Slug query parameter is required')
  // responder.finalizando()
  res.end()
}
