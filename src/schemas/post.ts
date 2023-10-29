import { defineField, defineType } from 'sanity'
// Tipos responsáveis por gerar o conteúdo CMS a ser exibido pela página. Na Documentação SanityCMS deve ter mais tipos para personalizar mais ainda a página
// Ex: Cada parte da página pode ter Arquivos com tipos específicos. aqui é relacionado a post, arquivo post.ts
export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'gallery',
      type: 'array',
      of: [
        { type: 'image' }
      ],
      options: {
        layout: 'grid'
      },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})
