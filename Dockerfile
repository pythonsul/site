# podmanfile-dockerfile
# ------------------------------------------------------------------------------
# Dockerfile for building and running a Hugo static site using Debian Bookworm.
#
# Base Image:
#   - debian:bookworm-slim for a minimal, foss environment.
#
# Arguments:
#   - HUGO_VERSION: Version of Hugo to install (default: 0.148.2).
#
# Installed Packages:
#   - curl: For downloading Hugo binary.
#   - make: For running build commands.
#   - git: For version control operations.
#   - bash: For shell scripting.
#   - ca-certificates: For secure HTTPS downloads.
#
# Hugo Installation:
#   - Downloads the specified Hugo Extended binary from GitHub.
#   - Extracts and installs Hugo to /usr/local/bin.
#
# Working Directory:
#   - /site: All site operations are performed here.
#
# Default Command:
#   - Runs `make check-env` to verify environment setup.
#
# Usage:
#   - Build: docker build -t hugo-site .
#   - Run:   docker run --rm -v $(pwd):/site hugo-site
# ------------------------------------------------------------------------------

FROM debian:bookworm-slim

ARG HUGO_VERSION=0.148.2

RUN apt-get update && apt-get install -y --no-install-recommends \
  curl \
  make \
  git \
  bash \
  ca-certificates \
  && rm -rf /var/lib/apt/lists/*

RUN curl -L -o /tmp/hugo.tar.gz \
  https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-64bit.tar.gz \
  && tar -xzf /tmp/hugo.tar.gz -C /tmp \
  && mv /tmp/hugo /usr/local/bin/hugo \
  && chmod +x /usr/local/bin/hugo \
  && rm /tmp/hugo.tar.gz

WORKDIR /site

CMD ["make", "check-env"]
