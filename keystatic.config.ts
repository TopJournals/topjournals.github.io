import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    brand: { name: 'Metastructure Lab CMS' }
  },
  collections: {
    publications: collection({
      label: 'Publications',
      path: 'src/content/publications/*',
      format: { data: 'json' },
      slugField: 'slug',
      parseSlugForSort: (slug) => { const m = slug.match(/^(\d{4})/); return m ? -parseInt(m[1]) : slug; },
      columns: ['title', 'firstAuthor', 'year', 'venue'],
      schema: {
        slug: fields.text({ label: 'Slug (Filename)', description: 'Do not edit unless necessary' }),
        title: fields.text({ label: 'Title' }),
        firstAuthor: fields.text({ label: 'First Author', description: 'Automatically populated or manually edited' }),
        year: fields.integer({ label: 'Year' }),
        authors: fields.text({ label: 'Authors' }),
        venue: fields.text({ label: 'Venue' }),
        tags: fields.array(fields.text({ label: 'Tag' }), { label: 'Tags', itemLabel: props => props.value }),
        paperUrl: fields.text({ label: 'Paper URL' }),
        featured: fields.checkbox({ label: 'Featured', defaultValue: false }),
        highlyCited: fields.checkbox({ label: 'Highly Cited', defaultValue: false }),
        status: fields.text({ label: 'Status' }),
        researchCategory: fields.text({ label: 'Research Category' }),
        designCategories: fields.array(fields.text({ label: 'Design Category' }), { label: 'Design Categories', itemLabel: props => props.value })
      }
    }),
    news: collection({
      label: 'News',
      path: 'src/content/news/*',
      format: { data: 'json' },
      slugField: 'slug',
      parseSlugForSort: (slug) => { const m = slug.match(/^(\d{4})-(\d{2})-(\d{2})/); return m ? -(parseInt(m[1]) * 10000 + parseInt(m[2]) * 100 + parseInt(m[3])) : slug; },
      columns: ['date', 'text'],
      schema: {
        slug: fields.text({ label: 'Slug (Filename)', description: 'Do not edit unless necessary' }),
        date: fields.text({ label: 'Date (YYYY-MM-DD)' }),
        text: fields.text({ label: 'Text', multiline: true }),
        highlight: fields.checkbox({ label: 'Highlight', defaultValue: false })
      }
    }),
    people: collection({
      label: 'People',
      path: 'src/content/people/*',
      format: { data: 'json' },
      slugField: 'slug',
      columns: ['name', 'role', 'status'],
      schema: {
        slug: fields.text({ label: 'Slug (Filename)', description: 'Do not edit unless necessary' }),
        name: fields.text({ label: 'Name' }),
        role: fields.text({ label: 'Role' }),
        start: fields.text({ label: 'Start Time' }),
        avatar: fields.text({ label: 'Avatar Path' }),
        scholarUrl: fields.text({ label: 'Google Scholar URL' }),
        researchGateUrl: fields.text({ label: 'ResearchGate URL' }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Current', value: 'current' },
            { label: 'Graduated', value: 'graduated' }
          ],
          defaultValue: 'current'
        })
      }
    }),
    honors: collection({
      label: 'Honors',
      path: 'src/content/honors/*',
      format: { data: 'json' },
      slugField: 'slug',
      parseSlugForSort: (slug) => { const m = slug.match(/^(\d{4})/); return m ? -parseInt(m[1]) : slug; },
      columns: ['year', 'title'],
      schema: {
        slug: fields.text({ label: 'Slug (Filename)', description: 'Do not edit unless necessary' }),
        year: fields.integer({ label: 'Year' }),
        title: fields.text({ label: 'Title' }),
        firstAuthor: fields.text({ label: 'First Author', description: 'Automatically populated or manually edited' }),
        description: fields.text({ label: 'Description', multiline: true })
      }
    }),
    conference: collection({
      label: 'Conferences',
      path: 'src/content/conference/*',
      format: { data: 'json' },
      slugField: 'slug',
      parseSlugForSort: (slug) => { const m = slug.match(/^(\d{4})/); return m ? -parseInt(m[1]) : slug; },
      columns: ['title', 'venue', 'date'],
      schema: {
        slug: fields.text({ label: 'Slug (Filename)', description: 'Do not edit unless necessary' }),
        type: fields.text({ label: 'Type (e.g. Presentation)' }),
        title: fields.text({ label: 'Title' }),
        firstAuthor: fields.text({ label: 'First Author', description: 'Automatically populated or manually edited' }),
        contributors: fields.text({ label: 'Contributors' }),
        venue: fields.text({ label: 'Venue' }),
        location: fields.text({ label: 'Location' }),
        date: fields.text({ label: 'Date' })
      }
    }),
    patents: collection({
      label: 'Patents',
      path: 'src/content/patents/*',
      format: { data: 'json' },
      slugField: 'slug',
      parseSlugForSort: (slug) => { const m = slug.match(/^(\d{4})/); return m ? -parseInt(m[1]) : slug; },
      columns: ['year', 'title'],
      schema: {
        slug: fields.text({ label: 'Slug (Filename)', description: 'Do not edit unless necessary' }),
        year: fields.integer({ label: 'Year' }),
        inventors: fields.text({ label: 'Inventors' }),
        title: fields.text({ label: 'Title' }),
        firstAuthor: fields.text({ label: 'First Author', description: 'Automatically populated or manually edited' }),
        type: fields.text({ label: 'Type' })
      }
    }),
    software: collection({
      label: 'Software',
      path: 'src/content/software/*',
      format: { data: 'json' },
      slugField: 'slug',
      parseSlugForSort: (slug) => { const m = slug.match(/^(\d{4})/); return m ? -parseInt(m[1]) : slug; },
      columns: ['year', 'title'],
      schema: {
        slug: fields.text({ label: 'Slug (Filename)', description: 'Do not edit unless necessary' }),
        year: fields.integer({ label: 'Year' }),
        holders: fields.text({ label: 'Holders' }),
        title: fields.text({ label: 'Title' }),
        firstAuthor: fields.text({ label: 'First Author', description: 'Automatically populated or manually edited' }),
        authority: fields.text({ label: 'Authority' })
      }
    }),
    books: collection({
      label: 'Books & Monographs',
      path: 'src/content/books/*',
      format: { data: 'json' },
      slugField: 'slug',
      parseSlugForSort: (slug) => { const m = slug.match(/^(\d{4})/); return m ? -parseInt(m[1]) : slug; },
      columns: ['year', 'title'],
      schema: {
        slug: fields.text({ label: 'Slug (Filename)', description: 'Do not edit unless necessary' }),
        year: fields.integer({ label: 'Year' }),
        authors: fields.text({ label: 'Authors' }),
        title: fields.text({ label: 'Title' }),
        publisher: fields.text({ label: 'Publisher' })
      }
    }),
    standards: collection({
      label: 'Standards',
      path: 'src/content/standards/*',
      format: { data: 'json' },
      slugField: 'slug',
      parseSlugForSort: (slug) => { const m = slug.match(/^(\d{4})/); return m ? -parseInt(m[1]) : slug; },
      columns: ['year', 'title'],
      schema: {
        slug: fields.text({ label: 'Slug (Filename)', description: 'Do not edit unless necessary' }),
        year: fields.integer({ label: 'Year' }),
        title: fields.text({ label: 'Title' }),
        firstAuthor: fields.text({ label: 'First Author', description: 'Automatically populated or manually edited' }),
        authority: fields.text({ label: 'Authority' }),
        code: fields.text({ label: 'Code' })
      }
    })
  },
  singletons: {
    siteProfile: singleton({
      label: 'Site Profile',
      path: 'src/content/site-profile/index',
      format: { data: 'json' },
      schema: {
        name: fields.text({ label: 'Name' }),
        title: fields.text({ label: 'Site Title' }),
        description: fields.text({ label: 'Site Description', multiline: true }),
        url: fields.text({ label: 'Site URL' }),
        leader: fields.text({ label: 'Leader Name' }),
        leaderChinese: fields.text({ label: 'Leader Name (Chinese)' }),
        leaderAvatar: fields.text({ label: 'Leader Avatar' }),
        affiliation: fields.text({ label: 'Affiliation' }),
        address: fields.text({ label: 'Address' }),
        email: fields.text({ label: 'Email' }),
        scholarUrl: fields.text({ label: 'Google Scholar URL' }),
        researchGateUrl: fields.text({ label: 'ResearchGate URL' }),
        biography: fields.array(fields.text({ label: 'Biography Paragraph', multiline: true }), { label: 'Biography', itemLabel: props => "Paragraph" }),
        professionalActivities: fields.array(fields.text({ label: 'Activity' }), { label: 'Professional Activities', itemLabel: props => props.value })
      }
    })
  }
});
