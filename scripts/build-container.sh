#!/usr/bin/bash

# now you can also parametrize the build process :)

node_version=$1

if [ -z "$node_version" ]; then
	node_version="lts-alpine3.18"
fi

image_tag="myimage:$node_version"

sudo docker build . --build-arg NODE_VERSION=$node_version -t $image_tag
