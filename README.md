# Business Analyst Portfolio (static site)

Plain HTML, CSS and JavaScript. No npm, Node, React or build step. Entry page: `index.html`.

## Upload to GitHub
1. Create a new repository on github.com (e.g. `business-analyst-portfolio`).
2. Click **Add file → Upload files** and drag in everything inside this folder (keep the `assets` folder structure).
3. Check `index.html` is in the repository root, then click **Commit changes**.

## Publish with GitHub Pages
**Settings → Pages → Deploy from branch → `main` → `/ (root)` → Save.** GitHub serves `index.html` at `https://<username>.github.io/<repo>/` after a minute or two.

## Update your content
Most content is in **`assets/js/data.js`**: name, title, tagline, email, LinkedIn, GitHub, resume path, Formspree endpoint, skills, experience and projects.
The About text, hero intro sentence and "6+ years" figure are in `index.html`.

## Images, resume, projects
- Images go in `assets/images/`. Profile photo: `profile.jpg`. First project image: `project-01.png` (save your BrewFlow process map with that name).
- Resume goes in `assets/documents/` as `resume.pdf` (replace the file to update).
- Add a project: copy one project block in `data.js`, change the `id` and the text. A "View BRD" button appears when you fill in `document`, e.g. `assets/documents/BrewSync_BRD.pdf`.

## Colours, fonts, favicon
- Colours: CSS variables at the top of `assets/css/style.css` (`:root` light, `[data-theme=dark]` dark).
- Fonts: `--font-head` and `--font-body` in the same place, plus the Google Fonts `<link>` in `index.html`.
- Favicon: replace `favicon.ico` in the root folder.
