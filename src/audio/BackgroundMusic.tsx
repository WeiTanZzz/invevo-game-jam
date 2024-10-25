import { useRef, useState } from "react"

const BackgroundMusic = () => {
    const ref = useRef<HTMLAudioElement | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)

    const handlePlay = () => {
        if (ref.current) {
            ref.current.volume = 0.5
            ref.current.loop = true
            ref.current
                .play()
                .then(() => {
                    setIsPlaying(true)
                })
                .catch(error => {
                    console.log("Playback failed:", error)
                })
        }
    }

    const handleStop = () => {
        if (ref.current) {
            ref.current.volume = 0
            setIsPlaying(false)
        }
    }

    return (
        <div>
            {isPlaying ? <button onClick={handleStop}>🔇</button> : <button onClick={handlePlay}>🎵</button>}
            <audio ref={ref} src={"/audio/bg.mp3"} />
        </div>
    )
}

export default BackgroundMusic
