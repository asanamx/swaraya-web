export default {
  name: 'category',
  title: 'Categoría',
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
      name: 'description',
      title: 'Descripción',
      type: 'text'
    }
  ],
  preview: {
    select: {
      title: 'title',
      siteName: 'site.name'
    },
    prepare({title, siteName}) {
      return {
        title: title,
        subtitle: siteName || 'Sin sitio'
      }
    }
  }
}
