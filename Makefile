TAG="\n\n\033[0;32m\#\#\# "
END=" \#\#\# \033[0m\n"

NPM=$(shell npm bin)

BROWSERIFY_OPTS=\
  -e src/main.js \
  -t babelify \
  --extension jsx -v

.PHONY: build watch test lint clean

build: clean lint test public/bundle.js
	@echo $(TAG)$@$(END)

watch: node_modules
	@echo $(TAG)$@$(END)
	$(NPM)/watchify $(BROWSERIFY_OPTS) -d -o public/bundle.js

public/bundle.js: node_modules
	@echo $(TAG)$@$(END)
	mkdir -p public
	$(NPM)/browserify $(BROWSERIFY_OPTS) -o public/bundle.js

test: node_modules
	@echo $(TAG)$@$(END)
	@echo TODO

lint: node_modules
	@echo $(TAG)$@$(END)
	$(NPM)/eslint 'src/**/*.js'

clean:
	@echo $(TAG)$@$(END)
	rm -rf public/bundle.js

node_modules: package.json
	@echo $(TAG)$@$(END)
	npm install
