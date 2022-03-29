#!/bin/sh
umask 000

CYPRESS_DIRECTOR_URL="https://director-cypress.os.lingobird.com"

if test ! -d ./node_modules; then

    # Added due to one of nextjs's dependencies (sharp) have slow download speed on default servers
    export npm_config_sharp_binary_host="https://npm.taobao.org/mirrors/sharp"
    export npm_config_sharp_libvips_binary_host="https://npm.taobao.org/mirrors/sharp-libvips" 

    if test ! -f ./yarn.lock; then
        yarn install;
    else
        yarn install --frozen-lockfile; # Alternative
    fi;
fi;

if test -d .cache; then
    chmod 777 -R .cache; 
fi;

# Cypress director url changer
sed -i -e "s|api_url:.*$|api_url: \"${CYPRESS_DIRECTOR_URL}/\"|g" ${CYPRESS_CACHE_FOLDER:-/*/.cache/Cypress}/*/Cypress/resources/app/packages/server/config/app.yml

# Waiting for Backend
if [ "$IS_CI" = "1" ]; then
    while ! curl lsp-backend:${lsp_BACKEND_APP_PORT} > /dev/null 2>&1; do sleep 1; done
fi;

npm run $@