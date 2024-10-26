import { createContext, ReactNode, useContext, useLayoutEffect, useState } from "react"
import { GRID_HEIGHT, GRID_WIDTH, hiddenCells, triggerCells } from "./map/cells"
import { GAMES } from "./mini-games/games"
import { IslandState } from "./types/islands-state"
import { ItemState } from "./types/item-state"

type MoveDirection = "up" | "down" | "left" | "right"
type GameState = {
    gamesCompleted: {
        get: (typeof GAMES)[number]["name"][]
        add: (game: (typeof GAMES)[number]["name"]) => void
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
    const [gamesCompleted, setGamesCompleted] = useState<(typeof GAMES)[number]["name"][]>([])
    const [items, setItems] = useState<ItemState[]>([
        { type: "Cannon Ball", inventoryPosition: 0, inventorySource: "player-inventory" },
        { type: "Rope", inventoryPosition: 4, inventorySource: "player-inventory" }
    ])
    const [islands, setIslands] = useState<IslandState[]>(islandsState)
    const [activeSpeechBubble, setActiveSpeechBubble] = useState<string>("")

    const [pos, setPos] = useState<{ x: number; y: number }>(defaultGameState.grid)
    const [lastMove, setLastMove] = useState<MoveDirection>(defaultGameState.grid.lastMove)
    const move = (direction: MoveDirection) => {
        console.log(gamesCompleted)
        setPos(p => {
            const newX = direction === "left" ? p.x - 1 : direction === "right" ? p.x + 1 : p.x
            const newY = direction === "up" ? p.y - 1 : direction === "down" ? p.y + 1 : p.y

            const trigger = triggerCells.find(cell => cell.x === newX && cell.y === newY)
            if (trigger !== undefined && !gamesCompleted.some(game => game === trigger.name)) {
                setActiveMiniGame(trigger.name)
            } else {
                setActiveMiniGame(undefined)
            }

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
        setGamesCompleted([])
        setActiveMiniGame(undefined)
    }

    const onKeyPress = (e: KeyboardEvent) => {
        if (e.key === "a") move("left")
        if (e.key === "d") move("right")
        if (e.key === "w") move("up")
        if (e.key === "s") move("down")
    }

    useLayoutEffect(() => {
        window.addEventListener("keydown", onKeyPress)
        return () => window.removeEventListener("keydown", onKeyPress)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const addCompletedGame = (game: (typeof GAMES)[number]["name"]) => {
        console.log("Adding game", game, gamesCompleted)
        setGamesCompleted(completed => {
            if (completed.includes(game)) return completed
            return [...completed, game]
        })
    }

    return (
        <GameStateContext.Provider
            value={{
                items: { get: items, set: setItems },
                gamesCompleted: { get: gamesCompleted, add: addCompletedGame },
                activeMiniGame: { get: activeMiniGame, set: setActiveMiniGame },
                grid: {
                    ...pos,
                    move,
                    lastMove
                },
                islandToFind: defaultGameState.islandToFind,
                islands: { get: islands, set: setIslands },
                activeSpeechBubble: { get: activeSpeechBubble, set: setActiveSpeechBubble },
                reset
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
    gamesCompleted: [],
    islands: islandsState,
    islandToFind: getDailyIsland(),
    activeSpeechBubble: ""
} as const
