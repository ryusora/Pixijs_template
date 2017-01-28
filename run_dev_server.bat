@echo OFF

SET PATH=..\utilities\encryption;%PATH%
SET NODE_ENV=_development
powershell ./node_modules/.bin/webpack-dev-server --host 0.0.0.0 --port 8383
