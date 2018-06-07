@echo OFF
setlocal enabledelayedexpansion

set LANG=EN
set MASTER_DATA=%~dp0\master_data
set INPUT=master.core

call %CORE% %DEFINES% -i %INPUT%
:end
