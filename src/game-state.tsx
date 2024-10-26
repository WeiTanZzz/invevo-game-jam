import { createContext, ReactNode, useContext, useState } from "react"
import { GRID_HEIGHT, GRID_WIDTH } from "./map/grid"
import { IslandState } from "./types/islands-state"
import { ItemState } from "./types/item-state"

type MoveDirection = "up" | "down" | "left" | "right"
type GameState = {
    items: {
        get: ItemState[]
        set: (items: ItemState[]) => void
    }
    grid: {
        x: { get: number }
        y: { get: number }
        move: (direction: MoveDirection) => void
        lastMove: MoveDirection
    }
    islands: {
        get: IslandState[]
        set: (items: IslandState[]) => void
    }
    islandToFind: IslandState
}

const randomIslandPosition = () => { return {x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 9)}}

const islandsState = [
    {name:"Treasure Island", path: "./islandOne.png", gridPosition: randomIslandPosition()},
    {name:"Skull Island", path: "./islandTwo.png", gridPosition: randomIslandPosition()},
]

const getDailyIsland = () => {
    const index = Math.floor(Math.random() * islandsState.length)

    return islandsState[index]
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
    const [islands, setIslands] = useState<IslandState[]>(islandsState)

    const [x, setX] = useState<number>(defaultGameState.grid.x)
    const [y, setY] = useState<number>(defaultGameState.grid.y)
    const [lastMove, setLastMove] = useState<MoveDirection>(defaultGameState.grid.lastMove)
    const move = (direction: "up" | "down" | "left" | "right") => {
        if (direction === "up") {
            setY(v => (1 <= v - 1 && v - 1 <= GRID_HEIGHT ? v - 1 : v))
        }
        if (direction === "down") {
            setY(v => (1 <= v + 1 && v + 1 <= GRID_HEIGHT ? v + 1 : v))
        }
        if (direction === "left") {
            setX(v => (1 <= v - 1 && v - 1 <= GRID_WIDTH ? v - 1 : v))
        }
        if (direction === "right") {
            setX(v => (1 <= v + 1 && v + 1 <= GRID_WIDTH ? v + 1 : v))
        }
        setLastMove(direction)
    }

    const reset = () => {
        setX(defaultGameState.grid.x)
        setY(defaultGameState.grid.y)
        setLastMove(defaultGameState.grid.lastMove)
    }

    return (
        <GameStateContext.Provider
            value={{
                items: { get: items, set: setItems },
                grid: {
                    x: { get: x },
                    y: { get: y },
                    move,
                    lastMove
                },
                islandToFind: defaultGameState.islandToFind,
                islands: { get: islands, set: setIslands },
                reset: reset
            }}
        >
            {children}
        </GameStateContext.Provider>
    )
}

const defaultGameState = {
    grid: {
        x: 2,
        y: 6,
        lastMove: "right"
    },
    islands: islandsState,
    islandToFind: getDailyIsland()
} as const
