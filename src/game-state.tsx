import { createContext, ReactNode, useCallback, useContext, useEffect, useLayoutEffect, useState } from "react"
import { useAudio } from "./audio/AudioProvider.tsx"
import { GRID_HEIGHT, GRID_WIDTH, hiddenCells, triggerCells } from "./map/cells"
import { GAMES } from "./mini-games/games"
import { GamePlayingState } from "./types/game-playing-state.ts"
import { ItemState } from "./types/item-state"

const gridWidth = 20
const gridHeight = 10

const randomGames = (amount: number) => {
    const pickGame = () => {
        const index = Math.floor(Math.random() * GAMES.length)
        const game = GAMES[index]
        if (game.name === "Check the island") return pickGame()
        return game.name
    }
    return Array.from({ length: amount }).map(pickGame)
}

const entities = [
    { name: "aquarius", path: "./navigation/aquarius.png", type: "water", randomWeight: 20 },
    { name: "player", path: "./navigation/galleon.png", type: "player", randomWeight: 0 },
    { name: "goal", path: "./navigation/open-treasure-chest.png", type: "goal", randomWeight: 0 },

    { name: "Monster", path: "./navigation/fish-monster.png", type: "monster", randomWeight: 0.2 },
    { name: "enemy-ship-5", path: "./navigation/unlit-bomb.png", type: "monster", randomWeight: 0.2 },
    { name: "Sea Creature", path: "./navigation/sea-creature.png", type: "monster", randomWeight: 0.2 },
    { name: "Tentacle", path: "./navigation/curled-tentacle.png", type: "monster", randomWeight: 0.2 },

    { name: "Dolphin", path: "./navigation/dolphin.png", type: "open", randomWeight: 0.2 },
    { name: "Jellyfish", path: "./navigation/jellyfish.png", type: "open", randomWeight: 0.2 },
    { name: "piranha", path: "./navigation/piranha.png", type: "open", randomWeight: 0.2 },
    { name: "shark", path: "./navigation/shark-fin.png", type: "open", randomWeight: 0.2 },
    { name: "Ship wreck", path: "./navigation/ship-wreck.png", type: "open", randomWeight: 0.2 },

    { name: "island", path: "./navigation/island.png", type: "blocker", randomWeight: 2 },

    { name: "enemy-ship-1", path: "./navigation/pirate-captain.png", type: "enemy", randomWeight: 0.2 },
    { name: "enemy-ship-2", path: "./navigation/pirate-flag.png", type: "enemy", randomWeight: 0.2 },
    { name: "enemy-ship-3", path: "./navigation/pirate-skull.png", type: "enemy", randomWeight: 0.2 },
    { name: "enemy-ship-4", path: "./navigation/skull-crossed-bones.png", type: "enemy", randomWeight: 0.2 },
    { name: "Blade", path: "./navigation/blade-bite.png", type: "enemy", randomWeight: 0.2 }
]

const water = entities.find(entity => entity.type === "water")!
const player = entities.find(entity => entity.type === "player")!
const goal = entities.find(entity => entity.type === "goal")!

type Grid = (typeof entities)[number][][]

const getRandomEntity = () => {
    const totalWeight = entities.reduce((sum, entity) => sum + entity.randomWeight, 0)

    let random = Math.random() * totalWeight

    for (const entity of entities) {
        const weight = entity.randomWeight
        if (random < weight) {
            return entity
        }
        random -= weight
    }

    return water
}

const navigationMinigameState = () => {
    const grid = new Array(gridWidth).fill([]).map(() => new Array(gridHeight).fill(water)) as Grid
    grid[0][0] = player
    grid[gridWidth - 1][gridHeight - 1] = goal

    for (let x = 0; x < gridWidth; x++) {
        for (let y = 0; y < gridHeight; y++) {
            if ((x <= 2 && y <= 2) || (x >= gridWidth - 2 && y >= gridHeight - 2)) continue
            grid[x][y] = getRandomEntity()
        }
    }

    return grid
}

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
    { day: "Monday", index: 0, timer: 90, minigames: randomGames(1) },
    { day: "Tuesday", index: 1, timer: 70, minigames: randomGames(2) },
    { day: "Wednesday", index: 2, timer: 60, minigames: randomGames(2) },
    { day: "Thursday", index: 3, timer: 60, minigames: randomGames(3) },
    { day: "Friday", index: 4, timer: 60, minigames: randomGames(4) }
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
    gamePlayingState: {
        get: GamePlayingState
        set: (item: GamePlayingState) => void
    }
    timeLeft: {
        get: number
        set: (time: number) => void
    }
}

type MinigamesBaseState = {
    telescope: {
        islandToFind: IslandState
        islands: IslandState[]
    }
    navigation: {
        grid: Grid
        islandToFind: IslandState
    }
}

const buildMinigamesBaseState = () => {
    const islands = islandsState()
    const islandToFind = getDailyIsland(islands)
    const baseState: MinigamesBaseState = {
        telescope: {
            islandToFind,
            islands
        },
        navigation: {
            grid: navigationMinigameState(),
            islandToFind
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
    const setActiveMiniGameWithMusic = useCallback(
        (game: (typeof GAMES)[number]["name"] | undefined) => {
            if (activeMiniGame === game) return
            setActiveMiniGame(game)
            audio.setBGM(GAMES.find(g => g.name === game)?.music)
        },
        [activeMiniGame, audio]
    )

    const [minigames, setMinigames] = useState<MinigamesBaseState>(buildMinigamesBaseState())
    const [items, setItems] = useState<ItemState[]>([
        { type: "Cannon Ball", inventoryPosition: 0, inventorySource: "player-inventory" },
        { type: "Rope", inventoryPosition: 4, inventorySource: "player-inventory" }
    ])
    const [activeSpeechBubble, setActiveSpeechBubble] = useState<string>("")

    const [pos, setPos] = useState<{ x: number; y: number }>(defaultGameState.grid)
    const [currentDay, setCurrentDay] = useState<(typeof daySpecifications)[number]>(daySpecifications[0])
    const [lastMove, setLastMove] = useState<MoveDirection>(defaultGameState.grid.lastMove)
    const [gamePlayingState, setGamePlayingState] = useState<GamePlayingState>("Start game")
    const [timeLeft, setTimeLeft] = useState<number>(currentDay.timer)

    const moveSea = (direction: MoveDirection) => {
        const playerX = minigames.navigation.grid.findIndex(row => row.find(cell => cell.type === "player"))!
        const playerY = minigames.navigation.grid[playerX].findIndex(cell => cell.type === "player")!

        const newX = direction === "left" ? playerX - 1 : direction === "right" ? playerX + 1 : playerX
        const newY = direction === "up" ? playerY - 1 : direction === "down" ? playerY + 1 : playerY

        if (minigames.navigation.grid[newX][newY].type === "blocker") {
            setActiveSpeechBubble("Ye’ve crashed into an island! No safe harbor here, just jagged rocks and hungry shadows...")
            return
        }
        if (minigames.navigation.grid[newX][newY].type === "goal") {
            setActiveSpeechBubble("Ye’ve reached the goal! But don’t celebrate too soon—darkness still stirs in the depths...")
            completeMinigame()
        }
        if (minigames.navigation.grid[newX][newY].type === "monster") {
            setActiveSpeechBubble("Watch out for the sea beats! They be older than the tides, and twice as hungry...")
            setGamePlayingState("Game over")
        }
        if (minigames.navigation.grid[newX][newY].type === "enemy") {
            setActiveSpeechBubble("Watch out for the blasted enemy flags! They’ll not hesitate to send us to the depths!")
            setGamePlayingState("Game over")
        }
        if (newX < 0 || newX >= gridWidth || newY < 0 || newY >= gridHeight) {
            setActiveSpeechBubble("Thar be dragons here!! Ye've sailed too far, turn back before it’s too late!")
        }

        setActiveSpeechBubble("The sea be calm, but the winds be fickle. Keep yer wits about ye, lest ye end up in Davy Jones’ locker...")
        minigames.navigation.grid[newX][newY] = player
        minigames.navigation.grid[playerX][playerY] = water
    }

    const moveMap = useCallback(
        (direction: MoveDirection) => {
            setPos(p => {
                const newX = direction === "left" ? p.x - 1 : direction === "right" ? p.x + 1 : p.x
                const newY = direction === "up" ? p.y - 1 : direction === "down" ? p.y + 1 : p.y

                const nextGame = currentDay.minigames[gamesCompleted.length]
                const trigger = triggerCells.find(cell => cell.x === newX && cell.y === newY)
                const isNextGame =
                    (trigger !== undefined && nextGame === trigger?.name) || (trigger?.name === "Check the island" && nextGame === "Telescope Mini Game")

                if (isNextGame) {
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
        },
        [currentDay.minigames, gamesCompleted.length, setActiveMiniGameWithMusic]
    )

    const reset = () => {
        startDay(0)
    }

    const nextDay = () => {
        startDay(currentDay.index + 1)
    }

    const startDay = (index: number) => {
        const day = daySpecifications[index]
        setCurrentDay(day)
        setActiveMiniGame(undefined)
        setActiveMiniGameWithMusic(undefined)
        setItems([])
        setTimeLeft(day.timer)
        addCompletedGame([])
        setPos(defaultGameState.grid)
        setLastMove(defaultGameState.grid.lastMove)
        setMinigames(buildMinigamesBaseState())
        setActiveSpeechBubble(
            `Yarr... it’s ${day.day}, and ye’re still breathin’. Best get crackin’ ${day.minigames.length} tasks lie ahead. Ignore 'em, and it won’t be the plank ye fear—it’ll be what lurks below...`
        )
    }

    const completeMinigame = () => {
        if (activeMiniGame === "Check the island") {
            setActiveMiniGameWithMusic(undefined)
            return
        }

        const updatedGamesCompleted = [...new Set([...gamesCompleted, activeMiniGame!])]
        addCompletedGame(updatedGamesCompleted)

        setActiveMiniGameWithMusic(undefined)

        if (updatedGamesCompleted.length === currentDay.minigames.length && currentDay.index === daySpecifications.length - 1) {
            setActiveSpeechBubble(
                `Ye've made it through, ye wily sea dog! The week's end be upon us, and ye’ve returned to base in one piece—though. Rest easy... for now. But remember, the sea always hungers for more, and next time, ye might not be so lucky...`
            )
        } else if (updatedGamesCompleted.length === currentDay.minigames.length && currentDay.index !== daySpecifications.length - 1) {
            setActiveSpeechBubble(
                `Har har! Ye’ve scraped through today’s tasks... but don’t get too cheery now, ye’re still alone, other than me goodself. Keep at it, and ye might just make it to the end of the week.`
            )
            nextDay()
        } else {
            setActiveSpeechBubble(
                `A task be done, aye... but don’t start thinkin’ ye’re safe just yet. ${currentDay.minigames.length - updatedGamesCompleted.length} tasks still remain, and only a fool counts his gold before he gets back to land...`
            )
        }
    }
    const onKeyPress = useCallback(
        (e: KeyboardEvent) => {
            const moveFn = activeMiniGame === "Sail the Seven Seas" ? moveSea : moveMap

            if (e.key === "a") moveFn("left")
            if (e.key === "d") moveFn("right")
            if (e.key === "w") moveFn("up")
            if (e.key === "s") moveFn("down")
        },
        [activeMiniGame, moveMap]
    )

    useEffect(() => {
        reset()
    }, [])

    useLayoutEffect(() => {
        window.addEventListener("keydown", onKeyPress)
        return () => window.removeEventListener("keydown", onKeyPress)
    }, [activeMiniGame])

    return (
        <GameStateContext.Provider
            value={{
                items: { get: items, set: setItems },
                gamesCompleted: { get: gamesCompleted, add: addCompletedGame },
                activeMiniGame: { get: activeMiniGame, set: setActiveMiniGameWithMusic },
                grid: {
                    ...pos,
                    move: moveMap,
                    lastMove
                },
                activeSpeechBubble: { get: activeSpeechBubble, set: setActiveSpeechBubble },
                reset: reset,
                nextDay: nextDay,
                completeGame: completeMinigame,
                currentDay,
                daySpecifications,
                minigames,
                gamePlayingState: { get: gamePlayingState, set: setGamePlayingState },
                timeLeft: { get: timeLeft, set: setTimeLeft }
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
