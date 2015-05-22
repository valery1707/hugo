#!/usr/bin/env bash

# Deploy blog to GitHub pages

hugo
git add -f public/
git commit -m "Blog updated at $(date)"
declare remote=$(git remote -v | grep fetch | awk '{print $2}')
git subtree push --prefix=public $remote gh-pages
