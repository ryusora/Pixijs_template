let FS = require('fs-extra')
let PATH = require('path')
let PROCESS = require('process')
let CHILD_PROCESS = require('child_process')
let Fontmin	= require('fontmin')
let DataHeaderExport = require('./DataHeaderExport')

class DataExport
{
    constructor()
    {
        let promiseCore = this.GetPromise('master.core', 'gui')
        promiseCore.then(evt =>
        {
            return this.GetPromise('master50.core', 'gui50')
        })
        promiseCore.then(evt =>
        {
            new DataHeaderExport(process.env.MASTER_DATA)
            let data = FS.readdirSync(PATH.normalize(process.env.MASTER_DATA))
            data.forEach(file =>
            {
                ;!'font|gui|gui50|sprite|sprite50|text'.includes(file.toLowerCase())
                    && FS.copySync(PATH.join(process.env.MASTER_DATA, file), PATH.join(process.env.RELEASE_DATA, file))
            })
        }, evt => { console.log('... ERROR!!\n') })
    }

    GetPromise(coreFile, output)
    {
        return new Promise((resolve, reject) =>
        {
            let corePath = FS.existsSync(coreFile) && coreFile
            if (!corePath)
            {
                resolve()
                return
            }
            CHILD_PROCESS.exec(`${PROCESS.env.CORE} -pack iniex -b -i ${corePath}`, (error, stdout, stderr) =>
            {
                console.log(stdout)
                FS.readdir('.release_CORE/data/', (err, files) =>
                {
                    files.forEach(file =>
                    {
                        FS.copySync(PATH.join('.release_CORE/data/', file), PATH.join(process.env.RELEASE_DATA, output, file + '.dat'))
                    })
                    // console.log('...Done\n')
                })
                ;error == null ? resolve && resolve() : reject && reject()
            })
        })
    }
}

module.exports = new DataExport()
