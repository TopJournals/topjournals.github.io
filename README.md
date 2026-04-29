# MetaWeb

Static academic website for the Metastructure research group, built with Astro, TypeScript, and Tailwind CSS.

## Local Development

```bash
npm install
npm run dev
```

## Static Build

```bash
npm run build
```

The generated site will be written to `dist/`.

## Pull Original Website Images

The research cards use locally stored images copied from the old public site. Fetch them with:

```bash
bash scripts/pull-original-images.sh
```

The files will be saved under `public/assets/original/research/`.
