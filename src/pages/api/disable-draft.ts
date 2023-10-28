import { NextApiRequest, NextApiResponse } from 'next'
// desabilitar(
export default function disable(
  // requisição: SolicitarNextApi,
  req: NextApiRequest,
  // resposta: RespostaNextApi<string | void>,
  res: NextApiResponse<string | void>,
) {
  // responder.definindoModoRascunho({ habilitar: falso })
  res.setDraftMode({ enable: false })
  // responder.escrevendoCabeça(307, { Localização: '/'})
  res.writeHead(307, { Location: '/' })
  // responder.finalizando()
  res.end()
}
