#!/usr/bin/env bash

npm install gulp mgit2 lerna@2.0.0-beta.34 codeclimate-test-reporter @ckeditor/ckeditor5-dev-lint && \
node_modules/.bin/gulp lint && \
node_modules/.bin/ckeditor5-dev-tests --coverage --reporter=dots
