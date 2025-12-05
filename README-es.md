# Sitio Python Sul 2025

![Build Status](https://github.com/pythonsul/python-sul-site/actions/workflows/build.yml/badge.svg)

**URL**: [sul.python.org.br/es/](https://sul.python.org.br/es/)

## Versiones alternativas de la documentación

- [Portuguese](./README-pt.md)
- [English](./README-en.md)

---
Este repositorio contiene el código fuente del **sitio oficial** de **Python Sul 2025**, una conferencia comunitaria que reúne a entusiastas y profesionales de Python en el sur de Brasil. Construido con [Hugo](https://gohugo.io/), el sitio soporta **tres idiomas** (portugués, español e inglés) y está diseñado para facilitar la gestión de contenido y la colaboración de la comunidad.

---

## Índice

- [Resumen del Proyecto](#resumen-del-proyecto)  
- [Características Principales](#características-principales)  
- [Estructura de Directorios](#estructura-de-directorios)  
- [Contenido Multilingüe](#contenido-multilingüe)  
- [Configuración](#configuración)  
- [Configuración del Entorno](#configuración-del-entorno)  
- [Agregar Contenido](#agregar-contenido)  
- [Assets y Datos](#assets-y-datos)  
- [Contribuciones](#contribuciones)  
- [Licencia](#licencia)  
- [Equipo](#equipo)

---

## Resumen del Proyecto

**Python Sul (PySul)** es un evento comunitario que conecta desarrolladores, entusiastas y profesionales de Python en toda la región sur de Brasil. Este sitio funciona como un hub completo, brindando información sobre el evento, sede, programación, publicaciones del blog y más — todo disponible en portugués, español e inglés.

---

## Características Principales

- 🌎 **Soporte Multilingüe:** Portugués (`pt-br`), Español (`es`) e Inglés (`en`)  
- 📄 **Contenido en Markdown:** Fácil creación y gestión de páginas y posts de blog  
- 🗂️ **Secciones de Datos Personalizadas:** Información del evento, sponsors y footer en JSON  
- 🖼️ **Gestión de Assets:** Organización de imágenes, fuentes y archivos estáticos  
- 🎨 **Layouts y Archetypes Personalizados:** Plantillas hechas a medida para diseño y estructura consistentes  
- ⚙️ **Scripts Automatizados:** Makefile para facilitar build y serve en desarrollo  
- 🤝 **Facilidad para Contribuciones:** Proceso simple para organizadores y colaboradores

---

## Estructura de Directorios

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

## Contenido Multilingüe

El contenido está organizado en la carpeta [`content/markdown/`](content/README.md) separado por idioma:

- `portuguese/` (`pt-br`)  
- `spanish/` (`es`)  
- `english/` (`en`)  

Cada carpeta de idioma contiene:  
- `_index.md` — Página principal específica del idioma  
- `blog/` — Publicaciones del blog  
- Otras páginas estáticas (ej.: código de conducta, acerca de, eventos pasados)

La configuración de idiomas está en [`config/_default/languages.toml`](config/_default/languages.toml).

---

## Configuración

- **Configuración del sitio:** [`config/_default/hugo.toml`](config/_default/hugo.toml)  
- **Idiomas:** [`config/_default/languages.toml`](config/_default/languages.toml)  
- **Montajes de contenido:** [`config/_default/module.toml`](config/_default/module.toml)  
- **Menús:** [`config/_default/menu/`](config/_default/menu/)

---

## Configuración del Entorno

### Requisitos Previos

- Por defecto: [Hugo Extended](https://gohugo.io/getting-started/installing/) versión `0.148.2` (ver Makefile para instalación automática)
- Con podman/docker: [Podman or Docker](https://podman.io/) 

### Comandos Comunes

| Comando               | Descripción                     |
|-----------------------|--------------------------------|
| `make check`          | Verificar versión de Hugo     |
| `make install`        | Instalar Hugo                  |
| `make serve`          | Servir sitio localmente para desarrollo |
| `make build`          | Construir sitio para producción |
| `make create-post`    | Crear un nuevo post de blog    |
| `podman-compose up -d --remove-orphans`    | Servir sitio localmente para desarrollo con podman |

Consulta el [`Makefile`](Makefile) para más detalles.

---

## Agregar Contenido

1. Seleccioná la carpeta del idioma correspondiente en [`content/markdown/`](content/README.md).  
2. Agregá archivos Markdown con el front matter siguiendo las convenciones de Hugo.  
3. Colocá los posts de blog dentro de la subcarpeta `blog/`.  
4. Referenciá los assets estáticos (imágenes, datos) desde sus carpetas respectivas.

---

## Assets y Datos

- **Imágenes:** [`content/images/`](content/images/)  
- **Datos del evento:** [`content/data/event.json`](content/data/event.json)  
- **Datos de secciones:** [`content/data/section/`](content/data/section/)  
- **Datos del footer:** [`content/data/footer.json`](content/data/footer.json)

---

## Contribuciones

¡Las contribuciones son muy bienvenidas! Por favor, abrí issues o hacé pull requests para:

- Nuevas páginas o posts del blog  
- Traducciones y mejoras de contenido  
- Corrección de errores y mejoras

Para más información, mirá los [links del footer](content/data/footer.json).

---

## Licencia

Este proyecto es open source. Consultá el repositorio para detalles sobre la licencia.

---

## Equipo

Personas involucradas en Python Sul 2025:

- [Regis Tomkiel](http://tomkiel.com.br)

---
