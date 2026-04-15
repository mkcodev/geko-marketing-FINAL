import { config, fields, collection } from "@keystatic/core"

export default config({
  storage:
    process.env.KEYSTATIC_GITHUB_CLIENT_ID
      ? {
          kind: "github",
          repo: "mkcodev/geko-marketing-FINAL",
          branchPrefix: "keystatic/",
        }
      : { kind: "local" },

  ui: {
    brand: { name: "Geko Blog" },
    navigation: {
      Blog: ["blog"],
    },
  },

  collections: {
    blog: collection({
      label: "Artículos",
      slugField: "title",
      path: "content/blog/*/",
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: { label: "Título" },
          slug: {
            label: "URL del artículo",
            description: "Se genera automáticamente desde el título. No cambies esto una vez publicado.",
          },
        }),

        excerpt: fields.text({
          label: "Extracto",
          description: "Resumen del artículo (160 chars máx). Sale en Google y en las tarjetas.",
          multiline: true,
          validation: { isRequired: true, length: { max: 300 } },
        }),

        publishDate: fields.date({
          label: "Fecha de publicación",
          defaultValue: { kind: "today" },
          validation: { isRequired: true },
        }),

        category: fields.select({
          label: "Categoría",
          options: [
            { label: "Redes Sociales", value: "redes-sociales" },
            { label: "Branding", value: "branding" },
            { label: "Diseño Web", value: "diseno-web" },
            { label: "Marketing Digital", value: "marketing-digital" },
            { label: "SEO", value: "seo" },
            { label: "Publicidad", value: "publicidad" },
          ],
          defaultValue: "marketing-digital",
        }),

        tags: fields.array(
          fields.text({ label: "Tag" }),
          {
            label: "Etiquetas",
            description: "Palabras clave separadas. Ej: instagram, engagement, contenido",
            itemLabel: (props) => (props as { value?: string }).value ?? "Tag",
          }
        ),

        author: fields.select({
          label: "Autor",
          options: [{ label: "Guillermo · CEO", value: "guillermo" }],
          defaultValue: "guillermo",
        }),

        featured: fields.checkbox({
          label: "Artículo destacado",
          description: "Aparecerá primero en la lista del blog.",
          defaultValue: false,
        }),

        content: fields.document({
          label: "Contenido",
          formatting: {
            inlineMarks: {
              bold: true,
              italic: true,
              underline: true,
              strikethrough: true,
              code: true,
            },
            listTypes: {
              ordered: true,
              unordered: true,
            },
            headingLevels: [2, 3, 4],
            blockTypes: {
              blockquote: true,
              code: true,
            },
            softBreaks: true,
          },
          dividers: true,
          links: true,
          images: {
            directory: "public/blog-images",
            publicPath: "/blog-images/",
          },
        }),
      },
    }),
  },
})
