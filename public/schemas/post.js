export default {
  name: 'post',
  title: 'Artículo',
  type: 'document',
  fields: [
    {
      name: 'site',
      title: 'Sitio',
      type: 'reference',
      to: [{type: 'site'}],
      validation: (Rule) => Rule.required()
    },
    {
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'excerpt',
      title: 'Extracto',
      type: 'text',
      rows: 4,
      description: 'Breve descripción (máx 500 caracteres)',
      validation: (Rule) => Rule.max(500)
    },
    {
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'published',
      title: 'Publicado',
      type: 'boolean',
      initialValue: false
    },
    {
      name: 'category',
      title: 'Categoría',
      type: 'reference',
      to: [{type: 'category'}]
    },
    {
      name: 'tags',
      title: 'Etiquetas',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tag'}]}]
    },
    {
      name: 'readingTime',
      title: 'Tiempo de lectura (min)',
      type: 'number'
    },
    {
      name: 'body',
      title: 'Contenido',
      type: 'blockContent'
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      published: 'published',
      siteName: 'site.name'
    },
    prepare({title, media, published, siteName}) {
      return {
        title: title,
        subtitle: siteName + ' - ' + (published ? 'Publicado' : 'Borrador'),
        media: media
      }
    }
  }
}
