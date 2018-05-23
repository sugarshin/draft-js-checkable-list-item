#!/bin/bash
set -eu

GIT_URL=git@github.com:sugarshin/draft-js-checkable-list-item.git
BRANCH=gh-pages
COMMIT=$(git rev-parse --short HEAD)
BUILD=build
DIR=.deploy

rm -rf $DIR
git clone --depth=1 $GIT_URL -b $BRANCH $DIR || (git init $DIR && cd $DIR && git remote add origin $GIT_URL && git checkout -b $BRANCH)
rm -rf ${DIR}/*
cp -R ${DIR}/../${BUILD}/* $DIR
cd $DIR
git add --all
git commit -m "Built artifacts of $COMMIT [ci skip]" || true
git push origin $BRANCH
