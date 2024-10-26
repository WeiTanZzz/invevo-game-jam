import { PitchDetector } from "pitchy"

export class FrequencyAnalyser {
    private readonly stream: MediaStream
    private readonly audioContext: AudioContext
    public readonly analyser: AnalyserNode
    private pitchDetector: PitchDetector<Float32Array>
    private readonly sampleRate: number
    private readonly bufferLength: number
    private readonly pitchMap: Record<string, number>
    private isStopped: boolean = false
    private readonly onPitchDetected: (pitch: string) => void
    private lastDetectedNote: string | null = null
    private animationFrameId: number | null = null

    constructor(stream: MediaStream, onPitchDetected: (pitch: string) => void) {
        this.stream = stream
        this.audioContext = new AudioContext()
        this.analyser = this.audioContext.createAnalyser()
        this.sampleRate = this.audioContext.sampleRate
        this.analyser.fftSize = 2048
        this.bufferLength = this.analyser.fftSize
        this.onPitchDetected = onPitchDetected

        const source = this.audioContext.createMediaStreamSource(this.stream)
        source.connect(this.analyser)
        this.pitchDetector = PitchDetector.forFloat32Array(this.bufferLength)

        this.pitchMap = {
            C4: 261.63,
            D4: 293.66,
            E4: 329.63,
            F4: 349.23,
            G4: 392.0,
            A4: 440.0,
            B4: 493.88
        }

        this.startDetection()
    }

    private startDetection(): void {
        const detectAndUpdate = () => {
            if (this.isStopped) return

            const pitch = this.detectPitch()
            if (pitch && pitch !== this.lastDetectedNote) {
                this.onPitchDetected(pitch)
                this.lastDetectedNote = pitch
            }

            this.animationFrameId = requestAnimationFrame(detectAndUpdate)
        }

        detectAndUpdate()
    }

    public detectPitch(): string | null {
        if (this.isStopped || !this.analyser) return null

        const dataArray = new Float32Array(this.bufferLength)
        this.analyser.getFloatTimeDomainData(dataArray)
        const [detectedPitch, clarity] = this.pitchDetector.findPitch(dataArray, this.sampleRate)

        if (clarity > 0.99) {
            return this.mapPitchToNote(detectedPitch)
        }
        return null
    }

    public stop(): void {
        this.isStopped = true
        this.stream.getTracks().forEach(track => track.stop())
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId)
        }
        this.audioContext.close().then(() => console.log("Audio context closed"))
        this.analyser.disconnect()
    }

    public mapPitchToNote(frequency: number): string | null {
        let closestNote: string | null = null
        let minDifference = Infinity

        for (const note in this.pitchMap) {
            const difference = Math.abs(this.pitchMap[note] - frequency)
            if (difference < minDifference) {
                minDifference = difference
                closestNote = note
            }
        }
        return closestNote
    }
}
