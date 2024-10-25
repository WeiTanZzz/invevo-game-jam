import React, { createContext, ReactNode, useContext } from "react"
import { AudioManager } from "./AudioManager"

const AudioContext = createContext<AudioManager | undefined>(undefined)

const audioManager = new AudioManager()

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <AudioContext.Provider value={audioManager}>{children}</AudioContext.Provider>
}

export const useAudio = () => {
    const context = useContext(AudioContext)
    if (!context) {
        throw new Error("useAudio must be with AudioProvider")
    }
    return context
}
