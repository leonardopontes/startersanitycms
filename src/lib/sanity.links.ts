export function resolveHref(
  // Tipodocumento?: string,
  documentType?: string,
  // slug?: string,
  slug?: string,
// string ou indefinido {  
): string | undefined {
  // Se (Tipodocumento) { for verdade
  switch (documentType) {
    // caso 'home':  
    case 'home':
      // retornar '/'
      return '/'
    // caso 'página':  
    case 'page':
      // retornar slug ? `/${slug}` : indefinido
      return slug ? `/${slug}` : undefined
    // caso 'projeto':  
    case 'project':
      // retornar slug ? `/projects/${slug}` : indefinido
      return slug ? `/projects/${slug}` : undefined
    // padrão:   
    default:
      // aviso.console('tipo de documento Inválido:', Tipodocumento)
      console.warn('Invalid document type:', documentType)
      // retornar indefinido
      return undefined
  }
}
