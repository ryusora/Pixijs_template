const _ = require('underscore')
const FS = require('fs')
const PATH = require('path')
const PROCESS = require('process')
const CHILD_PROCESS = require('child_process')
const XLSX = require('xlsx')
const XML2JS = require('xml2js')
const Fontmin = require('fontmin')

var coredata =
{
    alias: {},
    package: {},
    texture: {},
}

class SpriteHeader
{
    getFiles(dir, extname)
    {
        let result = []
        let paths = FS.readdirSync(PATH.normalize(dir))
        paths.forEach(element =>
        {
            let path = PATH.join(dir, element)
            if (FS.statSync(path).isFile())
            {
                ;(PATH.extname(path).toLowerCase() == extname) && result.push(path)
            }
            else
            {
                result = result.concat(this.getFiles(path, extname))
            }
        })
        return result
    }

    getRegEx(data, pattern)
    {
        let match, result = []
        while ((match = pattern.exec(data)))
        {
            result.push(match)
        }
        return result
    }

    constructor(path, extname)
    {
        this.path = path
        this.extname = extname
        this.data = {}
    }

    load(filename, callback)
    {
        FS.readFile(filename, 'utf8', (err, str) =>
        {
            if (err) throw err
            let spritename = PATH.basename(filename).split('.')[0].toUpperCase()
            let frames = this.getRegEx(str, /FRAME\s+"([\s\w]*)"\W+Index = (\d+).+\n\s+{([^}]+)}/gm)
            frames.forEach((frame, index) =>
            {
                ;(frame[1] != '') && (this.data[`SPRITE_${spritename}_FRAME_${frame[1].toUpperCase().replace(/ /g, '_')}`] = parseInt(frame[2]))
            })
            let anims = this.getRegEx(str, /ANIM\s+"([\s\w]*)"\W+Index = (\d+).+\n\s+{([^}]+)}/gm)
            anims.forEach((anim, index) =>
            {
                ;(anim[1] != '') && (this.data[`SPRITE_${spritename}_ANIM_${anim[1].toUpperCase().replace(/ /g, '_')}`] = parseInt(anim[2]))
            })
            let images = this.getRegEx(str, /IMAGE\s+\w+\s+"(.*)"/gm)
            images.forEach(image =>
            {
                coredata.texture[spritename] = PATH.basename(image[1]).split('.')[0].toUpperCase()
            })
            callback && callback()
        })
    }

    export(callback)
    {
        let promises = []
        let sprites = this.getFiles(this.path, this.extname)
        sprites.forEach(sprite =>
        {
            promises.push(new Promise((resolve, reject) =>
            {
                this.load(sprite, resolve)
            }))
        })
        Promise.all(promises).then(evt =>
        {
            callback && callback(this.data)
        })
    }
}

class GuiHeader extends SpriteHeader
{
    constructor(path)
    {
        super(path, '.level')
        this.path = path
    }

    load(filename, callback)
    {
        FS.readFile(filename, 'utf8', (err, str) =>
        {
            if (err) throw err
            let guiname = PATH.basename(filename).split('.')[0].toUpperCase()
            let layers = this.getRegEx(str, /LAYER OBJECT_LAYER \"(\w+)\-/gm)
            layers.forEach((layer, index) =>
            {
                this.data[`GUI_OBJECT_${guiname}_${layer[1].toUpperCase()}`] = index
            })
            callback && callback()
        })
    }

    exportSprite(callback)
    {
        FS.readFile(PATH.join(this.path, 'gui.gts'), 'utf8', (err, str) =>
        {
            if (err) throw err
            let sprites = this.getRegEx(str, /\"Sprites\"\s*{([^}]+)}/gm)
            sprites.forEach((sprite, index) =>
            {
                let tokens = sprite[1].trim().replace(/\r|\t|\"/g, '').split('\n')
                tokens.forEach(token =>
                {
                    let info = token.replace(/ /g, '').split('=')
                    this.data[`GUI_SPRITE_${info[1].toUpperCase()}`] = info[0]
                })
            })
            callback && callback()
        })
    }

    exportLevel(callback)
    {
        FS.readFile(PATH.join(this.path, 'gui.game'), 'utf8', (err, str) =>
        {
            if (err) throw err
            let levels = this.getRegEx(str, /LOAD_LEVEL\s+"(.*)"/gm)
            levels.forEach((level, index) =>
            {
                let id = `GUI_${PATH.basename(level[1]).split('.')[0].toUpperCase()}`
                this.data[id] = index
                coredata.alias[`level${index + 1}.layers`] = id
            })
            callback && callback()
        })
    }

    export(callback)
    {
        this.exportSprite(evt =>
        {
            this.exportLevel(evt =>
            {
                super.export(callback)
            })
        })
    }
}

class CoreHeader
{
    constructor(path)
    {
        this.path = path
        this.data =
        {
            CORE_SPRITE: 0,
            CORE_GUI: 1,
        }
    }

    export(callback)
    {
        FS.readFile(this.path, 'utf8', (err, str) =>
        {
            if (err) throw err
            XML2JS.parseString(str, (err, result) =>
            {
                result.Manager.Packages[0].package.forEach((item, index) =>
                {
                    coredata.alias[item.$.uid] = `PACK_${item.$.id.toUpperCase()}`
                    this.data[coredata.alias[item.$.uid]] = `${index + 1}.dat`
                })
                result.Manager.Resources[0].Type.forEach(item =>
                {
                    if (item.$.id == 'Sprites')
                    {
                        item.List[0].items[0].item.forEach(item =>
                        {
                            let info = { type: 'CORE_SPRITE', id: `GUI_SPRITE_${item.$.id}` }
                            info.alias = `'${coredata.texture[item.$.id]}'`
                            info.image = `IMAGE_${coredata.texture[item.$.id]}`
                            let binary = item.binary[0].$
                            let alias =  coredata.alias[binary.package]
                            coredata.package[alias] = coredata.package[alias] || {}
                            coredata.package[alias][binary.index] = info
                        })
                    }
                    else
                    if (item.$.id == 'Games')
                    {
                        item.List[0].items[0].item[0].binary.forEach(binary =>
                        {
                            let info = { type: 'CORE_GUI', id: coredata.alias[binary.$.id] }
                            let alias =  coredata.alias[binary.$.package]
                            if (!alias) return
                            coredata.package[alias] = coredata.package[alias] || {}
                            coredata.package[alias][binary.$.index] = info
                        })
                    }
                })
                this.write()
                callback && callback(this.data)
            })
        })
    }

    write()
    {
        FS.writeFileSync('.build_CORE/CoreHeader.js', 'module.exports = ' + JSON.stringify(coredata.package, null, '\t').replace(/\"/g, ''))
    }
}

class TextHeader
{
    constructor(path)
    {
        this.workbook = XLSX.readFile(path)
        this.data = {}
    }

    export(callback)
    {
        let glyph = '0123456789'
        let index = 0
        let contents = XLSX.utils.sheet_to_json(this.workbook.Sheets.contents, { header: 1 })
        for (let [, content] of contents.entries())
        {
            if (content[0] && !content[0].includes('::') )
            {
                glyph += content.toString()
                this.data[`TEXT_CONTENTS_${content[0]}`] = index
                index++
            }
        }
        this.data[`TEXT_CONTENTS_MAX`] = index
        let fontmin = new Fontmin()
            .src(`${PATH.join(process.env.MASTER_DATA, 'font')}/*.*`)
            .dest(`${PATH.join(process.env.RELEASE_DATA, 'font')}/`)
            // .use(Fontmin.otf2ttf())
            .use(Fontmin.glyph({text: glyph, hinting: false}))
        fontmin.run(evt =>
        {
            callback && callback(this.data)
        })
    }
}

class FileHeader
{
    constructor(path, type)
    {
        this.path = path
        this.type = type
        this.data = {}
    }

    export(callback)
    {
        let paths = FS.readdirSync(PATH.normalize(this.path))
        paths.forEach(element =>
        {
            this.data[`${this.type}_${PATH.basename(element).split('.')[0]}`.toUpperCase()] = element
        })
        callback && callback(this.data)
    }
}

class SoundHeader
{
    constructor(path)
    {
        this.path = path
        this.data = {}
    }

    export(callback)
    {
        let paths = FS.readdirSync(PATH.normalize(this.path))
        paths.forEach((element, index) =>
        {
            this.data[`${PATH.basename(element).split('.')[0]}`.toUpperCase()] = index
            this.data[`SOUND_${PATH.basename(element).split('.')[0]}`.toUpperCase()] = element
        })
        callback && callback(this.data)
    }
}

class DataHeaderExport
{
    constructor(MASTER_DATA_PATH)
    {
        this.write = this.write.bind(this)
        this.dataheader = {}
        let promises = []
        promises.push(new Promise((resolve, reject) =>
        {
            let guiHeader = new SpriteHeader(PATH.join(MASTER_DATA_PATH, 'sprite'), '.sprite')
            guiHeader.export(data =>
            {
                this.dataheader = _.extend(this.dataheader, data)
                resolve && resolve()
            })
        }))
        promises.push(new Promise((resolve, reject) =>
        {
            let guiHeader = new GuiHeader(PATH.join(MASTER_DATA_PATH, 'gui'))
            guiHeader.export(data =>
            {
                this.dataheader = _.extend(this.dataheader, data)
                resolve && resolve()
            })
        }))
        promises.push(new Promise((resolve, reject) =>
        {
            let textHeader = new TextHeader(PATH.join(MASTER_DATA_PATH, 'text', 'text.ods'))
            textHeader.export(data =>
            {
                this.dataheader = _.extend(this.dataheader, data)
                resolve && resolve()
            })
        }))
        promises.push(new Promise((resolve, reject) =>
        {
            let fileHeader = new FileHeader(PATH.join(MASTER_DATA_PATH, 'image'), 'image')
            fileHeader.export(data =>
            {
                this.dataheader = _.extend(this.dataheader, data)
                resolve && resolve()
            })
        }))
        promises.push(new Promise((resolve, reject) =>
        {
            let fileHeader = new SoundHeader(PATH.join(MASTER_DATA_PATH, 'sound', 'M4A'))
            fileHeader.export(data =>
            {
                this.dataheader = _.extend(this.dataheader, data)
                resolve && resolve()
            })
        }))
        Promise.all(promises).then(evt =>
        {
            let coreHeader = new CoreHeader(PATH.join(MASTER_DATA_PATH, '..', 'master.core'))
            coreHeader.export(data =>
            {
                this.dataheader = _.extend(this.dataheader, data)
                this.write()
            })
        })
    }

    write()
    {
        FS.writeFileSync('.build_CORE/DataHeader.js', 'module.exports = ' + JSON.stringify(this.dataheader, null, '\t'))
    }
}

module.exports = DataHeaderExport
