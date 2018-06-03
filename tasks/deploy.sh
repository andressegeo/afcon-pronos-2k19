#!/bin/bash

PROJECT="dgc-worldcup-russia-2018"

if [ -z $1 ] || [ -z $2 ] ; then
	echo "Usage: $0 <dev|production|acceptance> <version>"
	exit 1
fi

echo "Starting deploy script ..."

ENV=${1%/}

if [ $ENV = "dev" ] || [ $ENV = "acceptance" ] || [ $ENV = "production" ]
then
    echo Deploying on $ENV

    if [ -d "build" ]
    then
        rm -rf build
    fi
    mkdir build

    if [ $ENV != "dev" ]
    then
      ng build --env="$ENV"
    else
      ng build
    fi

    cp appengine_config.py build/appengine_config.py
    cp -r client build/
    cp -r config build/
    cp -r dist build/

    if [ $ENV != "dev" ]
    then
        cp -r deployments/$ENV/config.py build/config/config.py
    fi

    cp -r lib/ build/lib
    cp app.yaml build/app.yaml
    cp app.py build/app.py
    cp dispatch.yaml build/dispatch.yaml
    cd build

    sanitized_version=$(echo $2 | tr . -)
    echo $sanitized_version
    gcloud app deploy app.yaml dispatch.yaml --version=${sanitized_version} --project=$PROJECT --no-promote


else
    echo "Wrong environment. (dev | production | acceptance)."
fi
