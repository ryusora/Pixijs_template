@echo OFF

set MASTER_DATA=%~dp0\master_data\
set RELEASE_DATA=%~dp0\data\
set DATA_EXPORT=%~dp0\tools\Export_Scripts\DataExport.js
node %DATA_EXPORT%
pause
:end
