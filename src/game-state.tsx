import { createContext, ReactNode, useContext, useState } from "react"
import { GRID_HEIGHT, GRID_WIDTH, hiddenCells } from "./map/cells"
import { GAMES } from "./mini-games/games"
import { GamesCompletedState } from "./types/games-completed-state"
import { IslandState } from "./types/islands-state"
import { ItemState } from "./types/item-state"

type MoveDirection = "up" | "down" | "left" | "right"
type GameState = {
    gamesCompleted: {
        get: GamesCompletedState[]
        set: (items: GamesCompletedState[]) => void
    }
    activeMiniGame: {
        get: (typeof GAMES)[number]["name"] | undefined
        set: (game: (typeof GAMES)[number]["name"] | undefined) => void
    }

    items: {
        get: ItemState[]
        set: (items: ItemState[]) => void
    }
    grid: {
        x: number
        y: number
        move: (direction: MoveDirection) => void
        lastMove: MoveDirection
    }
    islands: {
        get: IslandState[]
        set: (items: IslandState[]) => void
    }
    islandToFind: IslandState
    activeSpeechBubble: {
        get: string
        set: (items: string) => void
    }
}

const randomIslandPosition = () => {
    return { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 9) }
}

const islandsState = [
    { name: "Treasure Island", path: "./Islands/treasure_island.png", gridPosition: randomIslandPosition() },
    { name: "Skull Island", path: "./Islands/skull_island.png", gridPosition: randomIslandPosition() },
    { name: "Bandana Island", path: "./Islands/bandana_island.png", gridPosition: randomIslandPosition() }
]

const gamesCompletedState = [
    {
        "Telescope Mini Game": { completed: false }
    }
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
    const [activeMiniGame, setActiveMiniGame] = useState<(typeof GAMES)[number]["name"]>()
    const [items, setItems] = useState<ItemState[]>([
        { type: "Cannon Ball", inventoryPosition: 0, inventorySource: "player-inventory" },
        { type: "Rope", inventoryPosition: 4, inventorySource: "player-inventory" }
    ])
    const [islands, setIslands] = useState<IslandState[]>(islandsState)
    const [gamesCompleted, setGamesCompleted] = useState<GamesCompletedState[]>(gamesCompletedState)
    const [activeSpeechBubble, setActiveSpeechBubble] = useState<string>("")

    const [pos, setPos] = useState<{ x: number; y: number }>(defaultGameState.grid)
    const [lastMove, setLastMove] = useState<MoveDirection>(defaultGameState.grid.lastMove)
    const move = (direction: "up" | "down" | "left" | "right") => {
        setPos(p => {
            const newX = direction === "left" ? p.x - 1 : direction === "right" ? p.x + 1 : p.x
            const newY = direction === "up" ? p.y - 1 : direction === "down" ? p.y + 1 : p.y
            const isInBounds =
                newX >= 1 && newX <= GRID_WIDTH && newY >= 1 && newY <= GRID_HEIGHT && !hiddenCells.some(cell => cell.x === newX && cell.y === newY)
            if (isInBounds) return { x: newX, y: newY }
            return p
        })
        setLastMove(direction)
    }

    const reset = () => {
        setPos(defaultGameState.grid)
        setLastMove(defaultGameState.grid.lastMove)
    }

    return (
        <GameStateContext.Provider
            value={{
                items: { get: items, set: setItems },
                gamesCompleted: { get: gamesCompleted, set: setGamesCompleted },
                activeMiniGame: { get: activeMiniGame, set: setActiveMiniGame },
                grid: {
                    ...pos,
                    move,
                    lastMove
                },
                islandToFind: defaultGameState.islandToFind,
                islands: { get: islands, set: setIslands },
                activeSpeechBubble: { get: activeSpeechBubble, set: setActiveSpeechBubble },
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
    gamesCompleted: [
        {
            "Telescope Mini Game": { completed: false }
        }
    ],
    islands: islandsState,
    islandToFind: getDailyIsland(),
    activeSpeechBubble: ""
} as const
