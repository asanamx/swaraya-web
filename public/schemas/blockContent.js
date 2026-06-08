export default {
  name: 'blockContent',
  title: 'Contenido',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'Título 1', value: 'h1'},
        {title: 'Título 2', value: 'h2'},
        {title: 'Título 3', value: 'h3'},
        {title: 'Cita', value: 'blockquote'}
      ],
      lists: [
        {title: 'Viñetas', value: 'bullet'},
        {title: 'Numerada', value: 'number'}
      ],
      marks: {
        decorators: [
          {title: 'Negrita', value: 'strong'},
          {title: 'Énfasis', value: 'em'},
          {title: 'Código', value: 'code'}
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Enlace',
            fields: [{name: 'href', type: 'url', title: 'URL'}]
          }
        ]
      }
    },
    {type: 'image', options: {hotspot: true}}
  ]
}
