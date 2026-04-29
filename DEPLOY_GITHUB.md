# Deploy to GitHub Pages

## 1. Create a repository

Create a GitHub repository for this project.

- If you want a project site, use any repository name such as `MetaWeb`.
- If you want the site at the root URL `https://<username>.github.io/`, the repository must be named `<username>.github.io`.

## 2. Initialize git locally

Run these commands in the project root:

```bash
git init
git branch -M main
git add .
git commit -m "Initial site setup"
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

## 3. Enable GitHub Pages

On GitHub:

1. Open the repository.
2. Go to `Settings` -> `Pages`.
3. Under `Build and deployment`, choose `GitHub Actions`.

The workflow in `.github/workflows/deploy.yml` will build and publish the Astro site automatically after every push to `main`.

## 4. Visit the site

- User/org site repo: `https://<username>.github.io/`
- Project site repo: `https://<username>.github.io/<repo>/`

## Notes

- `astro.config.mjs` already handles GitHub Pages `base` automatically in GitHub Actions.
- If you later use a custom domain, add `public/CNAME` and set `site` to your final domain.
