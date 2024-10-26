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
    islandToFind: string
}

export const getDailyIsland = () => {
    const islands = ["./islandTwo.png", "./islandOne.png"]
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
    const [items, setItems] = useState<ItemState[]>([
        { type: "Cannon Ball", inventoryPosition: 0, inventorySource: "player-inventory" },
        { type: "Rope", inventoryPosition: 4, inventorySource: "player-inventory" }
    ])
    const [islands, setIslands] = useState<IslandState[]>([
        {
            island: "./islandOne.png",
            gridPosition: {
                x: Math.floor(Math.random() * 20),
                y: Math.floor(Math.random() * 9)
            }
        },
        {
            island: "./islandTwo.png",
            gridPosition: {
                x: Math.floor(Math.random() * 20),
                y: Math.floor(Math.random() * 9)
            }
        }
    ])

    const [x, setX] = useState<number>(defaultGameState.grid.x)
    const [y, setY] = useState<number>(defaultGameState.grid.y)
    const [lastMove, setLastMove] = useState<MoveDirection>(defaultGameState.grid.lastMove)
    const move = (direction: "up" | "down" | "left" | "right") => {
        if (direction === "up") {
            setY(v => (1 <= v - 1 && v - 1 <= GRID_HEIGHT ? v - 1 : v))
            setLastMove("up")
        }
        if (direction === "down") {
            setY(v => (1 <= v + 1 && v + 1 <= GRID_HEIGHT ? v + 1 : v))
            setLastMove("down")
        }
        if (direction === "left") {
            setX(v => (1 <= v - 1 && v - 1 <= GRID_WIDTH ? v - 1 : v))
            setLastMove("left")
        }
        if (direction === "right") {
            setX(v => (1 <= v + 1 && v + 1 <= GRID_WIDTH ? v + 1 : v))
            setLastMove("right")
        }
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
        x: 1,
        y: 1,
        lastMove: "right"
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
} as const
