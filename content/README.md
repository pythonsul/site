# Content Directory

This folder contains all site content for the Python Sul 2026 website, built with [Hugo](https://gohugo.io/).

## Structure

- **data/**: Structured data files for site features.
- **images/**: Static images used throughout the site.
- **markdown/**: Main content in Markdown format, organized by language:
  - `portuguese/` (`pt-br`): Conteúdo em português brasileiro.
  - `spanish/` (`es`): Contenido en español.
  - `english/` (`en`): Content in English.
  - Each language folder contains:
    - `_index.md`: Homepage/landing content for the language.
    - `blog/`: Blog posts for the language.
    - Other pages and subfolders (e.g., `anos-anteriores/` for past events in Portuguese).
- Additional folders (e.g., `data/`, `images/`) support site features and assets.

## Multilingual Support

Content is organized to support Hugo's multilingual features. Each language has its own subfolder under `markdown/`, with localized pages and blog posts.

## Adding Content

To add a new post or page:
1. Choose the appropriate language folder under `markdown/`.
2. Add your Markdown file, following Hugo's front matter conventions.
3. For blog posts, place them in the `blog/` subfolder.

## Notes

- Static assets (images, data) are referenced from their respective folders.
- Content is mapped and mounted via Hugo's