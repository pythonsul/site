###############################################################################
# Python Sul2026 - Porto Alegre Makefile
# author: Regis Tomkiel<me@tomkiel.com.br>
#
# Content map:
# - check-env: Verify environment setup
# - install: Install Hugo Extended
# - update: Update Hugo Extended to the required version
# - serve: Start Hugo development server
# - build: Build the site using Hugo
# - create-post: Create a new blog post *inprogress*
###############################################################################

#------------------------------------------------------------------------------
# Configuration Variables
#------------------------------------------------------------------------------
OS_NAME           := $(shell uname -s)
GIT_BIN           := $(shell command -v git 2>/dev/null)
HUGO_BIN          := $(shell command -v hugo 2>/dev/null)
REQUIRED_HUGO_VER := 0.148.2

# Platform detection and paths
ifeq ($(OS_NAME),Linux)
	PLATFORM      := linux
	BIN_DIR       := $(HOME)/.local/bin
else ifeq ($(OS_NAME),Darwin)
	PLATFORM      := macos
	BIN_DIR       := /usr/local/bin
else ifeq ($(OS_NAME),Windows_NT)
	PLATFORM      := windows
	BIN_DIR       := $(subst \,/,$(USERPROFILE))/bin
else
	PLATFORM      := unknown
	BIN_DIR       := unknown
endif

HUGO_RELEASE_URL  := https://github.com/gohugoio/hugo/releases/download/v$(REQUIRED_HUGO_VER)/hugo_extended_$(REQUIRED_HUGO_VER)_$(PLATFORM)-64bit.tar.gz

#------------------------------------------------------------------------------
# Phony Targets
#------------------------------------------------------------------------------
.PHONY: check-env install update serve build create-post setup-git-hooks verify-git

#------------------------------------------------------------------------------
# Environment Checks & Setup
#------------------------------------------------------------------------------

check-env: verify-git setup-git-hooks check
	@echo "✅ Environment check complete."

verify-git:
	@if [ -z "$(GIT_BIN)" ]; then \
		echo "❌ Git is not installed. Please install Git before continuing."; \
		exit 1; \
	else \
		echo "✅ Git found at $(GIT_BIN)"; \
	fi

setup-git-hooks: verify-git
	@echo "🔧 Setting up local Git hooks path..."
	@if [ ! -d ".githooks" ]; then \
		mkdir -p .githooks; \
		touch .githooks/pre-push; \
		echo "📂 Created .githooks directory."; \
	fi
	@chmod -R u+x .githooks/pre-push
	@$(GIT_BIN) config core.hooksPath .githooks
	@echo "✅ Git hooks path set to .githooks for this repository."

check:
	@if [ -z "$(HUGO_BIN)" ]; then \
		echo "❌ Hugo is not installed. Run 'make install' to install Hugo Extended."; \
		exit 1; \
	else \
		echo "✅ Hugo found at $(HUGO_BIN)"; \
		HUGO_VERSION=$$($(HUGO_BIN) version | awk '{print $$2}' | sed 's/v//' | cut -d'-' -f1); \
		if [ "$$HUGO_VERSION" != "$(REQUIRED_HUGO_VER)" ]; then \
			echo "⚠️  Installed Hugo version ($$HUGO_VERSION) does not match required version ($(REQUIRED_HUGO_VER)). Consider updating."; \
		else \
			echo "✅ Hugo version is up to date."; \
		fi; \
	fi

#------------------------------------------------------------------------------
# Hugo Installation & Update
#------------------------------------------------------------------------------

install:
	@echo "🖥️  Detected OS: $(PLATFORM)"
	@if [ "$(PLATFORM)" = "unknown" ]; then \
		echo "❌ Unsupported OS. Please install Hugo manually."; \
		exit 1; \
	fi
	@if [ -z "$(HUGO_BIN)" ]; then \
		echo "⬇️  Installing Hugo Extended version $(REQUIRED_HUGO_VER)..."; \
		TEMP_DIR=$$(mktemp -d); \
		cd $$TEMP_DIR; \
		echo "🔗 Downloading $(HUGO_RELEASE_URL)..."; \
		curl -L -o hugo.tar.gz "$(HUGO_RELEASE_URL)"; \
		tar -xzf hugo.tar.gz; \
		if [ "$(PLATFORM)" = "windows" ]; then \
			mkdir -p "$(BIN_DIR)"; \
			mv hugo.exe "$(BIN_DIR)/hugo.exe"; \
			echo "✅ Moved hugo.exe to $(BIN_DIR). Ensure it's in your PATH."; \
		else \
			mkdir -p "$(BIN_DIR)"; \
			mv hugo "$(BIN_DIR)/hugo"; \
			echo "✅ Moved hugo to $(BIN_DIR). Ensure $(BIN_DIR) is in your PATH."; \
		fi; \
		echo "✅ Hugo installation complete."; \
	else \
		echo "✅ Hugo is already installed at $(HUGO_BIN)"; \
	fi


update: check-env
	@echo "🔄 Updating to Hugo Extended version $(REQUIRED_HUGO_VER)..."
	@if [ -z "$(HUGO_BIN)" ]; then \
		echo "❌ Hugo is not installed. Run 'make install' to install Hugo Extended."; \
		exit 1; \
	else \
		HUGO_VERSION=$$($(HUGO_BIN) version | awk '{print $$2}' | sed 's/v//' | cut -d'-' -f1); \
		if [ "$$HUGO_VERSION" = "$(REQUIRED_HUGO_VER)" ]; then \
			echo "✅ Hugo is already at required version ($(REQUIRED_HUGO_VER)). No update needed."; \
		else \
			echo "⚠️  Current Hugo version is $$HUGO_VERSION. Updating to $(REQUIRED_HUGO_VER)..."; \
			echo "🗑️  Removing existing Hugo at $(HUGO_BIN)..."; \
			if [ "$(PLATFORM)" = "windows" ]; then \
				del "$(HUGO_BIN)" || echo "Failed to remove Hugo executable. Please remove manually."; \
			else \
				rm -f "$(HUGO_BIN)" || echo "Failed to remove Hugo executable. Please remove manually."; \
			fi; \
			$(MAKE) install; \
		fi; \
	fi

#------------------------------------------------------------------------------
# Site Operations
#------------------------------------------------------------------------------

serve: check-env
	@echo "🚀 Starting Hugo development server..."
	@$(HUGO_BIN) server --bind=0.0.0.0 --renderToMemory --disableFastRender


build: check-env
	@echo "🏗️  Building site with Hugo..."
	@$(HUGO_BIN) --minify --gc
	@rm -rf resources
	@rm -rf .hugo_build.lock
	@echo "✅ Build complete. Check the 'public' directory for output."


create-post: check-env
	@echo "📝 Creating a new post..."
	@read -p "Enter the title of the post: " title; \
	if [ -z "$$title" ]; then \
		echo "❌ Title cannot be empty. Post creation aborted."; \
		exit 1; \
	fi; \
	read -p "Enter the language of the post *default is 'portuguese': " lang; \
	if [ -z "$$lang" ]; then \
		lang="portuguese"; \
	fi; \
	$(HUGO_BIN) new "$$lang"/blog/"$$title".md; \
	echo "✅ Post created at content/markdown/$$lang/blog/$$title.md"


#------------------------------------------------------------------------------
# End of Makefile
#------------------------------------------------------------------------------
