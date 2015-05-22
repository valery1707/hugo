#!/usr/bin/env bash

# Create a new blog post with title

show_usage() {
    echo "Usage: ./new_post.sh 'title for new post'";
    exit 1;
}

declare title=$1;
[[ -z $title ]] && show_usage;

declare title_lowcase=$(echo $title | awk '{print tolower($0)}');
declare basename=$(echo $title_lowcase | sed "s/\ /-/g");
declare datestamp=$(date +"%Y-%m-%d");
declare filename="$datestamp-$basename.markdown"
hugo new "blog/$filename"
