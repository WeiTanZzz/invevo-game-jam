import { createContext, ReactNode, useContext, useState } from "react"
import { GRID_HEIGHT, GRID_WIDTH } from "./map/grid"
import { ItemState } from "./types/item-state"

type GameState = {
    items: {
        get: ItemState[]
        set: (items: ItemState[]) => void
    }
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
    const [items, setItems] = useState<ItemState[]>([
        { type: "Cannon Ball", inventoryPosition: 0, inventorySource: "player-inventory" },
        { type: "Rope", inventoryPosition: 4, inventorySource: "player-inventory" }
    ])
    const [x, setX] = useState(1)
    const [y, setY] = useState(1)
    const reset = () => {
        setX(defaultGameState.grid.x)
        setY(defaultGameState.grid.y)
    }

    return (
        <GameStateContext.Provider
            value={{
                items: { get: items, set: setItems },
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
