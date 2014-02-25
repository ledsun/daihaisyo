#!/bin/bash
CMDNAME=`basename $0`
if [ $# -ne 1 ]; then
  echo "Usage: $CMDNAME commit_coment"
  exit 1
fi

grunt clean:dist && grunt build && cd dist && git add --all && git status && git commit -m '$1' && git push heroku master && heroku open
