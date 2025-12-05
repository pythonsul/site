# Site Python Sul 2025

![Build Status](https://github.com/pythonsul/python-sul-site/actions/workflows/build.yml/badge.svg)

**URL**: [sul.python.org.br](https://sul.python.org.br)

## Versões alternativas da documentação

- [Spanish](./README-pt.md)
- [English](./README-en.md)

---
Este repositório contém o código-fonte do **site oficial** do **Python Sul 2025**, uma conferência comunitária que reúne entusiastas e profissionais de Python no Sul do Brasil. Construído com [Hugo](https://gohugo.io/), o site suporta **três idiomas** (português, espanhol e inglês) e foi projetado para facilitar o gerenciamento de conteúdo e a colaboração da comunidade.

---

## Índice

- [Visão Geral do Projeto](#visão-geral-do-projeto)  
- [Principais Funcionalidades](#principais-funcionalidades)  
- [Estrutura de Diretórios](#estrutura-de-diretórios)  
- [Conteúdo Multilíngue](#conteúdo-multilíngue)  
- [Configuração](#configuração)  
- [Ambiente de Desenvolvimento](#ambiente-de-desenvolvimento)  
- [Adicionando Conteúdo](#adicionando-conteúdo)  
- [Assets e Dados](#assets-e-dados)  
- [Contribuindo](#contribuindo)  
- [Licença](#licença)  
- [Equipe](#equipe)

---

## Visão Geral do Projeto

O **Python Sul (PySul)** é um evento comunitário que conecta desenvolvedores, entusiastas e profissionais de Python em toda a região Sul do Brasil. Este site funciona como um hub completo, oferecendo informações sobre o evento, local, programação, postagens no blog e muito mais — tudo disponível em português, espanhol e inglês.

---

## Principais Funcionalidades

- 🌎 **Suporte Multilíngue:** Português (`pt-br`), Espanhol (`es`) e Inglês (`en`)  
- 📄 **Conteúdo em Markdown:** Fácil criação e gerenciamento de páginas e posts de blog  
- 🗂️ **Seções de Dados Customizadas:** Informações do evento, patrocinadores e rodapé em JSON  
- 🖼️ **Gerenciamento de Assets:** Organização de imagens, fontes e arquivos estáticos  
- 🎨 **Layouts e Archetypes Personalizados:** Templates feitos sob medida para design e estrutura consistentes  
- ⚙️ **Scripts Automatizados:** Makefile para facilitar build e serve no desenvolvimento  
- 🤝 **Facilidade para Contribuições:** Processo simples para organizadores e colaboradores

---

## Estrutura de Diretórios

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

## Conteúdo Multilíngue

O conteúdo está organizado na pasta [`content/markdown/`](content/README.md) separado por idioma:

- `portuguese/` (`pt-br`)  
- `spanish/` (`es`)  
- `english/` (`en`)  

Cada pasta de idioma contém:  
- `_index.md` — Página inicial específica do idioma  
- `blog/` — Postagens do blog  
- Outras páginas estáticas (ex.: código de conduta, sobre, eventos passados)

A configuração dos idiomas está em [`config/_default/languages.toml`](config/_default/languages.toml).

---

## Configuração

- **Configurações do site:** [`config/_default/hugo.toml`](config/_default/hugo.toml)  
- **Idiomas:** [`config/_default/languages.toml`](config/_default/languages.toml)  
- **Montagem de conteúdo:** [`config/_default/module.toml`](config/_default/module.toml)  
- **Menus:** [`config/_default/menu/`](config/_default/menu/)

---

## Ambiente de Desenvolvimento

### Pré-requisitos

- Padrão: [Hugo Extended](https://gohugo.io/getting-started/installing/) versão `0.148.2` (veja o Makefile para instalação automática)
- Usando container: [Podman or Docker](https://podman.io/) 

### Comandos Comuns

| Comando               | Descrição                        |
|-----------------------|---------------------------------|
| `make check`          | Verificar versão do Hugo e ambiente |
| `make install`        | Instalar Hugo                   |
| `make serve`     | Rodar site localmente para dev  |
| `make build`          | Gerar site para produção        |
| `make create-post`    | Criar uma nova postagem no blog* |
| `podman-compose up -d --remove-orphans`    | Rodar site localmente com podman |

Confira o [`Makefile`](Makefile) para mais detalhes.

---

## Adicionando Conteúdo

1. Escolha a pasta do idioma correspondente em [`content/markdown/`](content/README.md).  
2. Adicione arquivos Markdown com o front matter conforme o padrão do Hugo.  
3. Coloque posts de blog na subpasta `blog/`.  
4. Referencie assets estáticos (imagens, dados) nas pastas adequadas.

---

## Assets e Dados

- **Imagens:** [`content/images/`](content/images/)  
- **Dados do evento:** [`content/data/event.json`](content/data/event.json)  
- **Dados das seções:** [`content/data/section/`](content/data/section/)  
- **Dados do rodapé:** [`content/data/footer.json`](content/data/footer.json)

---

## Contribuindo

Sua contribuição é muito bem-vinda! Abra issues ou envie pull requests para:

- Novas páginas ou postagens de blog  
- Traduções e melhorias no conteúdo  
- Correção de bugs e aprimoramentos

Para mais informações, veja os [links do rodapé](content/data/footer.json).

---

## Licença

Este projeto é open source. Veja o repositório para informações detalhadas sobre a licença.

---

## Equipe

Pessoas envolvidas no Python Sul 2025:

- [Regis Tomkiel](http://tomkiel.com.br)

---
