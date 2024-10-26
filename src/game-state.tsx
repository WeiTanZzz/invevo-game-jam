import { createContext, ReactNode, useContext, useState } from "react"
import { GRID_HEIGHT, GRID_WIDTH, hiddenCells, triggerCells } from "./map/cells"
import { GAMES } from "./mini-games/games"
import { ItemState } from "./types/item-state"

const generateMinigames = (amount: number) => {
    const minigames = [...GAMES]
    const selectedMinigames = []
    for (let i = 0; i < amount; i++) {
        const index = Math.floor(Math.random() * minigames.length)
        selectedMinigames.push(minigames[index])
        minigames.splice(index, 1)
    }
    return selectedMinigames
}

const randomIslandPosition = () => {
    return { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 9) }
}

const islandsState = [
        { name: "Treasure Island", path: "./Islands/treasure_island.png", gridPosition: randomIslandPosition() },
        { name: "Skull Island", path: "./Islands/skull_island.png", gridPosition: randomIslandPosition() },
        { name: "Bandana Island", path: "./Islands/bandana_island.png", gridPosition: randomIslandPosition() },
        { name: "Calm House Island", path: "./Islands/Calm_house.png", gridPosition: randomIslandPosition() },
        { name: "Dracula Island", path: "./Islands/dracula_island.png", gridPosition: randomIslandPosition() },
        { name: "Ghost Island", path: "./Islands/Ghost_island.png", gridPosition: randomIslandPosition() },
        { name: "Nessy", path: "./Islands/Nessy.png", gridPosition: randomIslandPosition() },
        { name: "Pirate Hat Island", path: "./Islands/pirate_hat_island.png", gridPosition: randomIslandPosition() },
        { name: "Star Island", path: "./Islands/star_island.png", gridPosition: randomIslandPosition() },
        { name: "Target Island", path: "./Islands/target_island.png", gridPosition: randomIslandPosition() }
]

const getDailyIsland = () => {
    const index = Math.floor(Math.random() * islandsState.length)

    return islandsState[index]
}

const daySpecifications = [
    { day: "Monday", index: 0, timer: 60, minigames: generateMinigames(1), islandToFind: getDailyIsland(), islands: islandsState },
    { day: "Tuesday", index: 1, timer: 50, minigames: generateMinigames(5), islandToFind: getDailyIsland(), islands: islandsState },
    { day: "Wednesday", index: 2, timer: 40, minigames: generateMinigames(5), islandToFind: getDailyIsland(), islands: islandsState },
    { day: "Thursday", index: 3, timer: 30, minigames: generateMinigames(6), islandToFind: getDailyIsland(), islands: islandsState },
    { day: "Friday", index: 4, timer: 20, minigames: generateMinigames(10), islandToFind: getDailyIsland(), islands: islandsState }
]

type MoveDirection = "up" | "down" | "left" | "right"
type GameState = {
    gamesCompleted: {
        get: (typeof GAMES)[number]["name"][]
        add: (game: (typeof GAMES)[number]["name"][]) => void
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
    activeSpeechBubble: {
        get: string
        set: (items: string) => void
    },
    currentDay: typeof daySpecifications[number],
    daySpecifications: typeof daySpecifications
}


const GameStateContext = createContext<(GameState & { reset: () => void; nextDay: () => void, completeGame: () => void }) | undefined>(undefined)
export const useGameState = () => {
    const context = useContext(GameStateContext)
    if (!context) {
        throw new Error("useGameState must be used within a GameStateProvider")
    }
    return context
}

export const GameStateProvider = ({ children }: { children: ReactNode }) => {
    const [gamesCompleted, addCompletedGame] = useState<(typeof GAMES)[number]["name"][]>([])
    const [activeMiniGame, setActiveMiniGame] = useState<(typeof GAMES)[number]["name"]>()
    const [items, setItems] = useState<ItemState[]>([
        { type: "Cannon Ball", inventoryPosition: 0, inventorySource: "player-inventory" },
        { type: "Rope", inventoryPosition: 4, inventorySource: "player-inventory" }
    ])
    const [activeSpeechBubble, setActiveSpeechBubble] = useState<string>("")

    const [pos, setPos] = useState<{ x: number; y: number }>(defaultGameState.grid)
    const [currentDay, setCurrentDay] = useState<(typeof daySpecifications)[0]>(daySpecifications[0])
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
        setCurrentDay(daySpecifications[0])
        startDay()
    }

    const nextDay = () => {
        const nextDayIndex = currentDay.index + 1
        setCurrentDay(daySpecifications[nextDayIndex])
        startDay()
    }

    const startDay = () => {
        setPos(defaultGameState.grid)
        setLastMove(defaultGameState.grid.lastMove)
        setActiveSpeechBubble(`welcome to a new day, it's ${currentDay.day} and you have ${currentDay.minigames.length} tasks to complete.`)
    }

    const completeMinigame = () => {
        setActiveSpeechBubble(`well done kids`)
        addCompletedGame([activeMiniGame ?? ""])
        setActiveMiniGame(undefined)
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
                activeSpeechBubble: { get: activeSpeechBubble, set: setActiveSpeechBubble },
                reset: reset,
                nextDay: nextDay,
                completeGame: completeMinigame
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
    }
} as const
