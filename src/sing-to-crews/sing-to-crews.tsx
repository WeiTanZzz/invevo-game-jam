import { useEffect, useRef, useState } from "react"
import { FrequencyAnalyser } from "../audio/FrequencyAnalyser.ts"

const PITCHES = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"]

const selectRandomNotes = (n: number) => {
    for (let i = PITCHES.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[PITCHES[i], PITCHES[j]] = [PITCHES[j], PITCHES[i]]
    }

    return PITCHES.slice(0, n)
}

const AudioRecorder: React.FC = () => {
    const [isRecording, setIsRecording] = useState(true)
    const [aims, setAims] = useState<string[]>(selectRandomNotes(7))
    const aimsRef = useRef(aims)
    const audioContextRef = useRef<AudioContext | null>(null)
    const analyserRef = useRef<AnalyserNode | null>(null)
    const mediaStreamRef = useRef<MediaStream | null>(null)
    const frequencyAnalyserRef = useRef<FrequencyAnalyser | null>(null)

    useEffect(() => {
        if (isRecording) {
            startRecording()
        } else {
            stopRecording()
        }

        return () => {
            stopRecording()
        }
    }, [isRecording])

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            mediaStreamRef.current = stream

            const audioContext = new AudioContext()
            audioContextRef.current = audioContext
            const analyser = audioContext.createAnalyser()
            analyser.fftSize = 2048
            analyserRef.current = analyser

            const source = audioContext.createMediaStreamSource(stream)
            source.connect(analyser)

            frequencyAnalyserRef.current = new FrequencyAnalyser(analyser, audioContext)

            detectNote()
        } catch (error) {
            console.error("Error accessing microphone:", error)
        }
    }

    const stopRecording = () => {
        mediaStreamRef.current?.getTracks().forEach(track => track.stop())
        audioContextRef.current?.close()
        mediaStreamRef.current = null
        analyserRef.current = null
        frequencyAnalyserRef.current = null
        setAims(selectRandomNotes(7))
    }

    const detectNote = () => {
        if (aimsRef.current.length === 0) {
            setIsRecording(false)
            return
        }

        const updateNote = () => {
            const detectedNote = frequencyAnalyserRef.current?.detectPitch()
            if (detectedNote && detectedNote === aimsRef.current[0]) {
                console.log("detectedNote", detectedNote)
                console.log("aims", aimsRef.current[0])
                setAims(prev => prev.slice(1, prev.length))
            }

            if (isRecording) {
                requestAnimationFrame(updateNote)
            }
        }
        updateNote()
    }

    return (
        <div>
            <button onClick={() => setIsRecording(!isRecording)}>{isRecording ? "停止录音" : "开始录音"}</button>
            <p>当前音符: {aims.length > 0 ? aims.join(", ") : "Done"}</p>
        </div>
    )
}

export default AudioRecorder
