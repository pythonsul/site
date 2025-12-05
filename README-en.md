# Python Sul 2025 Website

![Build Status](https://github.com/pythonsul/python-sul-site/actions/workflows/build.yml/badge.svg)

**URL**: [sul.python.org.br/en/](https://sul.python.org.br/en/)

## Alternatives doc versions

- [Portuguese](./README-pt.md)
- [Spanish](./README-es.md)

---
This repository hosts the **official website** source code for **Python Sul 2025**, a community-driven conference uniting Python enthusiasts across Southern Brazil. Built with [Hugo](https://gohugo.io/), the site supports **three languages** (Portuguese, Spanish, English) and is designed for straightforward content management and community collaboration.

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Key Features](#key-features)  
- [Directory Structure](#directory-structure)  
- [Multilingual Content](#multilingual-content)  
- [Configuration](#configuration)  
- [Development Setup](#development-setup)  
- [Adding Content](#adding-content)  
- [Assets & Data](#assets--data)  
- [Contributing](#contributing)  
- [License](#license)  
- [Team](#team)

---

## Project Overview

**Python Sul (PySul)** is a vibrant community event that connects Python developers, enthusiasts, and professionals throughout Southern Brazil. This website acts as a comprehensive hub, providing details about the event, venue, schedule, blog updates, and more — all fully localized in Portuguese, Spanish, and English.

---

## Key Features

- 🌎 **Multilingual Support:** Portuguese (`pt-br`), Spanish (`es`), and English (`en`)  
- 📄 **Markdown-Based Content:** Easy to write and manage pages and blog posts  
- 🗂️ **Custom Data Sections:** JSON-driven event info, sponsors, and footer content  
- 🖼️ **Asset Management:** Organized handling of images, fonts, and static files  
- 🎨 **Custom Layouts & Archetypes:** Tailored templates for consistent design and content structure  
- ⚙️ **Automated Build & Serve:** Convenient Makefile scripts for development workflow  
- 🤝 **Community-Friendly:** Simple contribution process for organizers and volunteers

---

## Directory Structure

```plaintext
.
├── .gitignore
├── Makefile
├── README.md
├── Dockerfile
├── podman-compose.yml
├── CNAME
├── .githooks/
│   ├── pre-push
├── .github/
│   ├── workflows/
│   │   └── build.yml
├── config/
│   ├── README.md
│   └── _default/
│       ├── hugo.toml
│       ├── languages.toml
│       ├── module.toml
│       └── menu/
│           ├── menu.en.toml
│           ├── menu.es.toml
│           └── menus.pt-br.toml
├── content/
│   ├── README.md
│   ├── data/
│   │   ├── event.json
│   │   ├── footer.json
│   │   └── section/
│   ├── images/
│   │   ├── caramelo.png
│   │   ├── logo_colored.png
│   │   └── ...
│   └── markdown/
│       ├── english/
│       ├── portuguese/
│       └── spanish/
├── src/
│   ├── archetypes/
│   │   └── default.md
│   ├── assets/
│   │   ├── custom.css
│   │   ├── jsconfig.json
│   │   ├── fonts/
│   │   ├── js/
│   │   └── scss/
│   ├── i18n/
│   │   ├── en.toml
│   │   └── ...
│   ├── layouts/
│   └── static/
```

---

## Multilingual Content

Content is neatly organized under [`content/markdown/`](content/README.md) by language:

- `portuguese/` (`pt-br`)  
- `spanish/` (`es`)  
- `english/` (`en`)  

Each language folder contains:  
- `_index.md` — Language-specific homepage  
- `blog/` — Blog posts  
- Other static pages (e.g., Code of Conduct, About, Past Events)

Language settings are configured in [`config/_default/languages.toml`](config/_default/languages.toml).

---

## Configuration

- **Site settings:** [`config/_default/hugo.toml`](config/_default/hugo.toml)  
- **Languages:** [`config/_default/languages.toml`](config/_default/languages.toml)  
- **Content mounts:** [`config/_default/module.toml`](config/_default/module.toml)  
- **Menus:** [`config/_default/menu/`](config/_default/menu/)

---

## Development Setup

### Prerequisites

- Default: [Hugo Extended](https://gohugo.io/getting-started/installing/) version `0.148.2` (see Makefile for auto-install)
- Container: [Podman or Docker](https://podman.io/) 

### Common Commands

| Command               | Description                    |
|-----------------------|-------------------------------|
| `make check`          | Verify Hugo version and environment |
| `make install`        | Install Hugo                  |
| `make serve`          | Serve site locally for dev    |
| `make build`          | Build production site         |
| `make create-post`    | Create a new blog post        |
| `podman-compose up -d --remove-orphans`    | Serve site locally using podman  |


Check the [`Makefile`](Makefile) for full details.

---

## Adding Content

1. Select the appropriate language folder in [`content/markdown/`](content/README.md).  
2. Add Markdown files with proper Hugo front matter.  
3. Place blog posts inside the `blog/` subfolder.  
4. Reference static assets (images, data) from their respective folders.

---

## Assets & Data

- **Images:** [`content/images/`](content/images/)  
- **Event data:** [`content/data/event.json`](content/data/event.json)  
- **Section data:** [`content/data/section/`](content/data/section/)  
- **Footer data:** [`content/data/footer.json`](content/data/footer.json)

---

## Contributing

We warmly welcome contributions! Feel free to open issues or submit pull requests for:

- New pages or blog posts  
- Translations and content improvements  
- Bug fixes and enhancements

For more info, see the [footer links](content/data/footer.json).

---

## License

This project is open source. Please refer to the repository for detailed license information.

---

## Team

People involved in Python Sul 2025:

- [Regis Tomkiel](http://tomkiel.com.br)

---
