import { createContext, ReactNode, useContext, useState } from "react"

type GameState = {
    grid: {
        x: { get: number; set: (x: number) => void }
        y: { get: number; set: (y: number) => void }
    }
    islands: {
        gridPosition: { x: number; y: number }
        island: string
    }[]
    islandToFind: string
}

export const getDailyIsland = () => {
    //todo get a random island to find
    const islands = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"]
    const index = Math.floor(Math.random() * islands.length)

    return islands[index]
}

const GameStateContext = createContext<(GameState & { reset: () => void }) | undefined>(undefined)
export const useGameState = () => {
    const context = useContext(GameStateContext)
    if (!context) {
        throw new Error("useGameState must be used within a GameStateProvider")
    }
    return context
}
export const GameStateProvider = ({ children }: { children: ReactNode }) => {
    const [x, setX] = useState(1)
    const [y, setY] = useState(1)
    const reset = () => {
        setX(defaultGameState.grid.x)
        setY(defaultGameState.grid.y)
    }

    return (
        <GameStateContext.Provider
            value={{
                grid: { x: { get: x, set: setX }, y: { get: y, set: setY } },
                islands: defaultGameState.islands,
                islandToFind: defaultGameState.islandToFind,
                reset: reset
            }}
        >
            {children}
        </GameStateContext.Provider>
    )
}

const defaultGameState = {
    grid: {
        x: 1,
        y: 1
    },
    islands: [
        {
            gridPosition: {
                x: Math.floor(Math.random() * 20),
                y: Math.floor(Math.random() * 9)
            },
            island: "./islandTwo.png"
        },
        {
            gridPosition: {
                x: Math.floor(Math.random() * 20),
                y: Math.floor(Math.random() * 9)
            },
            island: "./islandOne.png"
        }
    ],
    islandToFind: getDailyIsland()
}
