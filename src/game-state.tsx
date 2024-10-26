import { createContext, ReactNode, useContext, useLayoutEffect, useState } from "react"
import { useAudio } from "./audio/AudioProvider.tsx"
import { GRID_HEIGHT, GRID_WIDTH, hiddenCells, triggerCells } from "./map/cells"
import { GAMES } from "./mini-games/games"
import { ItemState } from "./types/item-state"

const randomGames = (amount: number) =>
    Array.from({ length: amount }).map(() => {
        const index = Math.floor(Math.random() * GAMES.length)
        return GAMES[index]
    })

const randomIslandPosition = () => {
    return { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 9) }
}

type IslandState = {
    name: string
    path: string
    gridPosition: {
        x: number
        y: number
    }
}
const islandsState = (): IslandState[] => [
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

const getDailyIsland = (islands: IslandState[]) => {
    const index = Math.floor(Math.random() * islands.length)
    return islands[index]
}

const daySpecifications = [
    { day: "Monday", index: 0, timer: 60, minigames: randomGames(1) },
    { day: "Tuesday", index: 1, timer: 50, minigames: randomGames(5) },
    { day: "Wednesday", index: 2, timer: 40, minigames: randomGames(5) },
    { day: "Thursday", index: 3, timer: 30, minigames: randomGames(6) },
    { day: "Friday", index: 4, timer: 20, minigames: randomGames(10) }
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
    }
    currentDay: (typeof daySpecifications)[number]
    daySpecifications: typeof daySpecifications
    minigames: MinigamesBaseState
}

type MinigamesBaseState = {
    telescope: {
        islandToFind: IslandState
        islands: IslandState[]
    }
}

const buildMinigamesBaseState = () => {
    const islands = islandsState()
    const baseState: MinigamesBaseState = {
        telescope: {
            islandToFind: getDailyIsland(islands),
            islands
        }
    }

    return baseState
}

const GameStateContext = createContext<
    | (GameState & {
          reset: () => void
          nextDay: () => void
          completeGame: () => void
      })
    | undefined
>(undefined)
export const useGameState = () => {
    const context = useContext(GameStateContext)
    if (!context) {
        throw new Error("useGameState must be used within a GameStateProvider")
    }
    return context
}

export const GameStateProvider = ({ children }: { children: ReactNode }) => {
    const audio = useAudio()

    const [gamesCompleted, addCompletedGame] = useState<(typeof GAMES)[number]["name"][]>([])
    const [activeMiniGame, setActiveMiniGame] = useState<(typeof GAMES)[number]["name"]>()
    const setActiveMiniGameWithMusic = (game: (typeof GAMES)[number]["name"] | undefined) => {
        console.log(game, activeMiniGame)
        if (activeMiniGame === game) return
        setActiveMiniGame(game)
        audio.setBGM(GAMES.find(g => g.name === game)?.music)
    }

    const [minigames, setMinigames] = useState<MinigamesBaseState>(buildMinigamesBaseState())
    const [items, setItems] = useState<ItemState[]>([
        { type: "Cannon Ball", inventoryPosition: 0, inventorySource: "player-inventory" },
        { type: "Rope", inventoryPosition: 4, inventorySource: "player-inventory" }
    ])
    const [activeSpeechBubble, setActiveSpeechBubble] = useState<string>("")

    const [pos, setPos] = useState<{ x: number; y: number }>(defaultGameState.grid)
    const [currentDay, setCurrentDay] = useState<(typeof daySpecifications)[number]>(daySpecifications[0])
    const [lastMove, setLastMove] = useState<MoveDirection>(defaultGameState.grid.lastMove)
    const move = (direction: MoveDirection) => {
        console.log(gamesCompleted)
        setPos(p => {
            const newX = direction === "left" ? p.x - 1 : direction === "right" ? p.x + 1 : p.x
            const newY = direction === "up" ? p.y - 1 : direction === "down" ? p.y + 1 : p.y

            const trigger = triggerCells.find(cell => cell.x === newX && cell.y === newY)
            console.log(trigger)
            if (trigger !== undefined && !gamesCompleted.some(game => game === trigger.name)) {
                setActiveMiniGameWithMusic(trigger.name)
            } else {
                setActiveMiniGameWithMusic(undefined)
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
        setMinigames(buildMinigamesBaseState())
        setActiveSpeechBubble(`welcome to a new day, it's ${currentDay.day} and you have ${currentDay.minigames.length} tasks to complete.`)
    }

    const completeMinigame = () => {
        addCompletedGame([activeMiniGame ?? ""])
        setActiveMiniGame(undefined)

        if (gamesCompleted.length === currentDay.minigames.length) {
            setActiveSpeechBubble(`congratulations, you've completed all the tasks for today. Let's move on to the next day.`)
            nextDay()
        } else {
            setActiveSpeechBubble(
                `congratulations, you've completed a task for today. You have ${currentDay.minigames.length - gamesCompleted.length} tasks left.`
            )
        }
    }
    const onKeyPress = (e: KeyboardEvent) => {
        if (e.key === "a") move("left")
        if (e.key === "d") move("right")
        if (e.key === "w") move("up")
        if (e.key === "s") move("down")
    }

    useLayoutEffect(() => {
        startDay()

        window.addEventListener("keydown", onKeyPress)
        return () => window.removeEventListener("keydown", onKeyPress)
    }, [])

    return (
        <GameStateContext.Provider
            value={{
                items: { get: items, set: setItems },
                gamesCompleted: { get: gamesCompleted, add: addCompletedGame },
                activeMiniGame: { get: activeMiniGame, set: setActiveMiniGameWithMusic },
                grid: {
                    ...pos,
                    move,
                    lastMove
                },
                activeSpeechBubble: { get: activeSpeechBubble, set: setActiveSpeechBubble },
                reset: reset,
                nextDay: nextDay,
                completeGame: completeMinigame,
                currentDay,
                daySpecifications,
                minigames
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
