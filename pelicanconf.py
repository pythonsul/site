#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
from decouple import config

AUTHOR = 'Python Sul'

SITENAME = 'Python Sul - 2024'
SITEYEAR = 2024

SITEURL = config('SITE_URL', default='/')

PATH = 'content'

SITEMAP = {
    'format': 'xml',
    'exclude': ['tags.html', 'categories.html', 'authors.html', 'archives.html']
}

ARTICLE_ORDER_BY = 'date'
TIMEZONE = 'America/Sao_Paulo'

DEFAULT_LANG = 'pt-br'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = 'feeds/all.atom.xml'
CATEGORY_FEED_ATOM = 'feeds/{slug}.atom.xml'

# OLD_EVENTS
OLD_EVENTS = (
    ('2023','/2023'),
)

MENU = (
    ('#intro','Início', True),
    ('#about','Sobre', False),
    ('#contact','Contato', False),
)

# Social widget
SOCIAL = {
    'instagram':'https://www.instagram.com/pythonsul',
    'facebook':'https://www.facebook.com/pythonsul',
    'twitter': 'https://twitter.com/PythonSul',
}

DEFAULT_PAGINATION = False
SITE_META_KEYWORDS = f"Python Sul {SITEYEAR}, evento python, python, pythonsul, comunidade python, python rio grande do sul, comunidade"
SITE_META_DESCRIPTION = "Evento da comunidade Python do sul do pais, com intuito de popularizar e disseminar o conhecimento da linguagem python"

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

EVENTO = {
    "data": "2024",
    "data_completa": "2024",
    "local": "Florianopolis",
    "call_for_papers_link": '',
    "inscricao_link": '',
}