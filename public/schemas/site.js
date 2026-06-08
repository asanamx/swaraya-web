export default {
  name: 'site',
  title: 'Sitio',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Nombre del sitio',
      type: 'string',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'domain',
      title: 'Dominio',
      type: 'string',
      description: 'Ej: swaraya.ai, mi-otro-sitio.com',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'description',
      title: 'Descripción',
      type: 'text',
      rows: 3
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'primaryColor',
      title: 'Color primario',
      type: 'string',
      description: 'Código hexadecimal (ej: #7AC4E0)'
    },
    {
      name: 'active',
      title: 'Activo',
      type: 'boolean',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'domain',
      media: 'logo'
    }
  }
}
