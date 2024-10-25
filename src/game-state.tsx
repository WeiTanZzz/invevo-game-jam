import { createContext, ReactNode, useContext, useState } from "react"
import { GRID_HEIGHT, GRID_WIDTH } from "./map/grid"
import { DraggedItem } from "./types/dragged-item"

type GameState = {
    grid: {
        x: { get: number; set: (x: number) => void; increment: (change: number) => void }
        y: { get: number; set: (y: number) => void; increment: (change: number) => void }
    }
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
                draggedItem: { get: draggedItem, set: setDraggedItem },
                grid: {
                    x: { get: x, set: setX, increment: (change: number) => setX(v => (1 <= v + change && v + change <= GRID_WIDTH ? v + change : v)) },
                    y: { get: y, set: setY, increment: (change: number) => setY(v => (1 <= v + change && v + change <= GRID_HEIGHT ? v + change : v)) }
                },
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
    }
}
