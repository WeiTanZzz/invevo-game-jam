import { PitchDetector } from "pitchy"

export class FrequencyAnalyser {
    private readonly analyser: AnalyserNode | null
    private pitchDetector: PitchDetector<Float32Array>
    private readonly sampleRate: number
    private readonly bufferLength: number
    private readonly pitchMap: Record<string, number>

    constructor(analyser: AnalyserNode, audioContext: AudioContext) {
        this.analyser = analyser
        this.sampleRate = audioContext.sampleRate
        this.bufferLength = analyser.fftSize
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
    }

    public detectPitch(): string | null {
        if (!this.analyser) return null

        const dataArray = new Float32Array(this.bufferLength)
        this.analyser.getFloatTimeDomainData(dataArray)
        const [detectedPitch, clarity] = this.pitchDetector.findPitch(dataArray, this.sampleRate)
        if (clarity > 0.95) {
            return this.mapPitchToNote(detectedPitch)
        }
        return null
    }

    private mapPitchToNote(frequency: number): string | null {
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
