const defaultAudio = "/audio/bgm/sailing.mp3"
export class AudioManager {
    private backgroundAudio: HTMLAudioElement
    private effects: { [key: string]: HTMLAudioElement }

    constructor() {
        this.backgroundAudio = new Audio(defaultAudio)
        this.backgroundAudio.loop = true
        this.backgroundAudio.volume = 0.3
        this.effects = {}
    }

    setBGM(src?: string) {
        this.backgroundAudio.src = src ?? defaultAudio
        this.backgroundAudio.currentTime = 1
        this.backgroundAudio.play().catch(error => console.log("Failed to play background music:", error))
    }

    toggleBackgroundPlayPause() {
        if (this.backgroundAudio.paused) {
            this.backgroundAudio.play().catch(error => console.log("Failed to play background music:", error))
        } else {
            this.backgroundAudio.pause()
        }
    }

    addEffect(name: string, src: string) {
        const effect = new Audio(src)
        effect.volume = 0.3
        this.effects[name] = effect
    }

    playEffect(name: string) {
        const effect = this.effects[name]
        if (effect) {
            effect.currentTime = 0
            effect.play().catch(error => console.log(`Failed to play effect ${name}:`, error))
        } else {
            console.warn(`Effect ${name} does not exist.`)
        }
    }
}
