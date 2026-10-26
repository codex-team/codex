#!/bin/sh

# @editorjs/list is kept on 1.x: 2.x saves nested items that the backend can't validate and render yet
yarn add -D \
  @editorjs/code \
  @editorjs/delimiter \
  @editorjs/editorjs \
  @editorjs/embed \
  @editorjs/header \
  @editorjs/image \
  @editorjs/inline-code \
  @editorjs/link \
  @editorjs/list@^1 \
  @editorjs/marker \
  @editorjs/quote \
  @editorjs/raw \
  @editorjs/table \
  @editorjs/translate-inline

