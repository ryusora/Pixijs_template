@echo OFF

SET NODE_ENV=_localhost
powershell ./node_modules/.bin/webpack-dev-server --mode=development --host 0.0.0.0 --https 
