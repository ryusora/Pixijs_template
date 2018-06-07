import { Howl } from 'howler';

class SoundManager
{
    constructor()
    {
        this.audioSources = {}
        this.extEvtHandler = {}
    }

    SetExtEvtHandler(extEvtHandler)
    {
        this.extEvtHandler = extEvtHandler
    }

    Load(audios, callback)
    {
        let promises = []
        for (let alias in audios)
        {
            promises.push(new Promise((resolve, reject) =>
            {
                this.audioSources[alias] = new Howl(
                {
                    src: [ Utils.GetDataPath("sound/M4A/" + audios[alias]) ],
                    onend: this.extEvtHandler.OnEnded,
                })
                this.audioSources[alias].once('load', resolve)
            }))
        }
        Promise.all(promises).then(callback)
    }

    Play(alias, loop = false)
    {
        let sound = this.audioSources[alias]
        sound._loop = loop
        sound.play()
    }

    Stop(alias)
    {
        this.audioSources[alias].stop()
    }

    Pause(alias)
    {
        this.audioSources[alias].pause()
    }

    StopAll()
    {
    }
}
module.exports = new SoundManager()
