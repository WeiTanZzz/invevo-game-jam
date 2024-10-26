import { useCallback, useEffect, useRef, useState } from "react"
import { useAudio } from "../../audio/AudioProvider.tsx"
import { FrequencyAnalyser } from "../../audio/FrequencyAnalyser.ts"

const AUDIO_CHEER = "singToCrews/cheer"
const AUDIO_BOO = "singToCrews/boo"

const NOTES = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"]

const getRandomNotes = (n: number) => {
    const selectedNotes: string[] = []
    for (let i = 0; i < n; i++) {
        let randomNote
        do {
            randomNote = NOTES[Math.floor(Math.random() * NOTES.length)]
        } while (selectedNotes.length > 0 && randomNote === selectedNotes[selectedNotes.length - 1])
        selectedNotes.push(randomNote)
    }
    return selectedNotes
}

const MOCK_CREWS: {
    id: number
    name: string
    status: CrewStatus
}[] = [
    { id: 1, name: "John", status: "normal" },
    { id: 2, name: "Jane", status: "normal" },
    { id: 3, name: "Jack", status: "normal" }
]

const SingToCrewsMiniGame = () => {
    const audio = useAudio()
    audio.addEffect(AUDIO_CHEER, "/audio/effect/sing-to-crews/cheer.mp3")
    audio.addEffect(AUDIO_BOO, "/audio/effect/sing-to-crews/boo.mp3")

    const [crews, setCrews] = useState<CrewProps[]>(MOCK_CREWS)
    const [gameStart, setGameStart] = useState(true)
    const [canContinue, setCanContinue] = useState(true)
    const [aims, setAims] = useState<string[]>(getRandomNotes(1))
    const frequencyAnalyserRef = useRef<FrequencyAnalyser | null>(null)

    const aimsRef = useRef(aims)
    const canContinueRef = useRef(canContinue)

    const onGameEnd = () => {
        setAims([])
        aimsRef.current = []
        setGameStart(false)
        frequencyAnalyserRef.current?.stop()
        frequencyAnalyserRef.current = null
    }

    const handlePitchDetected = useCallback(
        (pitch: string) => {
            if (!canContinueRef.current || aimsRef.current.length === 0) return
            if (aimsRef.current[0] === pitch) {
                const newAims = aimsRef.current.slice(1)
                setAims(newAims)
                aimsRef.current = newAims
                audio.playEffect(AUDIO_CHEER)
                setCrews(crews => crews.map(crew => ({ ...crew, status: "happy" })))
            } else {
                audio.playEffect(AUDIO_BOO)
                setCrews(crews => crews.map(crew => ({ ...crew, status: "sad" })))
            }
            setCanContinue(false)
            canContinueRef.current = false
            setTimeout(() => {
                setCrews(crews => crews.map(crew => ({ ...crew, status: "normal" })))
                setCanContinue(true)
                canContinueRef.current = true
            }, 2000)
        },
        [audio]
    )

    useEffect(() => {
        const startRecording = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
                frequencyAnalyserRef.current = new FrequencyAnalyser(stream, handlePitchDetected)
            } catch (error) {
                if (error instanceof Error) {
                    alert(`Error accessing microphone: ${error.message}`)
                }
            }
        }

        if (gameStart) {
            startRecording()
        } else {
            onGameEnd()
        }

        return () => {
            frequencyAnalyserRef.current?.stop()
        }
    }, [gameStart, handlePitchDetected])

    return (
        <div className={"relative w-svw h-svh bg-black bg-cover bg-[url('/images/sing-to-crew/bg.webp')]"}>
            {aims[0] && <div className={"absolute left-1/3 text-9xl text-red-400"}>Clue: {aims[0]}</div>}
            <div className={"m-auto w-10/12 h-5/6 flex justify-center items-end flex-wrap"}>
                {crews.map((crew, index) => (
                    <Crew key={index} id={crew.id} name={crew.name} status={crew.status} />
                ))}
            </div>
        </div>
    )
}

type CrewStatus = "normal" | "happy" | "sad"
type CrewProps = {
    id: number
    name: string
    status: CrewStatus
}

const Crew = ({ name, status }: CrewProps) => {
    return (
        <div className={"size-64"}>
            <div className={"flex justify-center text-2xl text-white"}>{name}</div>
            <img src={`/images/sing-to-crew/crew_${status}.png`} alt={`Crew`} />
        </div>
    )
}

export default SingToCrewsMiniGame
