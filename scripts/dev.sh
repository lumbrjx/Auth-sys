#!/usr/bin/bash
#
# I don't call npm scripts directly mostly because I always have some sort of
# pre-setup that I need to do, so I always use the /scripts/dev.sh in order
# to start the dev server(s)\.

# INFO: any pre-setup, such as sourcing env variables, ensuring node_modules are installed (pnpm i) etc.

pnpm run dev
