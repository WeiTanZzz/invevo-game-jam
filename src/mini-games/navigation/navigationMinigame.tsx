import { useGameState } from "../../game-state"
import { cn } from "../../util"

const gridWidth = 20
const gridHeight = 10

const entities = [
    { name: "aquarius", path: "./navigation/aquarius.png", type: "water", randomWeight: 20 },
    { name: "player", path: "./navigation/galleon.png", type: "player", randomWeight: 0 },
    { name: "goal", path: "", type: "goal", randomWeight: 0 },

    { name: "Monster", path: "./navigation/fish-monster.png", type: "monster", randomWeight: 0.2 },
    { name: "enemy-ship-5", path: "./navigation/unlit-bomb.png", type: "monster", randomWeight: 0.2 },
    { name: "Sea Creature", path: "./navigation/sea-creature.png", type: "monster", randomWeight: 0.2 },
    { name: "Tentacle", path: "./navigation/curled-tentacle.png", type: "monster", randomWeight: 0.2 },
    
    { name: "Dolphin", path: "./navigation/dolphin.png", type: "open", randomWeight: 0.2 },
    { name: "Jellyfish", path: "./navigation/jellyfish.png", type: "open", randomWeight: 0.2 },
    { name: "treasure 1", path: "./navigation/locked-chest.png", type: "open", randomWeight: 0.2 },
    { name: "treasure 2", path: "./navigation/open-treasure-chest.png", type: "open", randomWeight: 0.2 },
    { name: "piranha", path: "./navigation/piranha.png", type: "open", randomWeight: 0.2 },
    { name: "shark", path: "./navigation/shark-fin.png", type: "open", randomWeight: 0.2 },
    { name: "Ship wreck", path: "./navigation/ship-wreck.png", type: "open", randomWeight: 0.2 },

    { name: "island", path: "./navigation/island.png", type: "blocker", randomWeight: 2 },

    { name: "enemy-ship-1", path: "./navigation/pirate-captain.png", type: "enemy", randomWeight: 0.2 },
    { name: "enemy-ship-2", path: "./navigation/pirate-flag.png", type: "enemy", randomWeight: 0.2 },
    { name: "enemy-ship-3", path: "./navigation/pirate-skull.png", type: "enemy", randomWeight: 0.2 },
    { name: "enemy-ship-4", path: "./navigation/skull-crossed-bones.png", type: "enemy", randomWeight: 0.2 },
    { name: "Blade", path: "./navigation/blade-bite.png", type: "enemy", randomWeight: 0.2 },
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

export const NavigationMinigame = () => {
    const grid = navigationMinigameState() as (typeof entities)[number][][]
    const { currentDay } = useGameState()
    console.log(grid.length, grid[0].length)
    return (
        <div className="flex grow bg-contain h-full w-full bg-no-repeat bg-center items-center justify-center bg-blue-200 overflow-hidden">
            <div className="w-full h-full py-[11%] ps-[10%] pe-[22%]">
                <div className="flex flex-1 flex-col items-center justify-center">
                    {new Array(gridHeight).fill(1).map((_, y) => (
                        <div className="flex flex-row flex-1 grow w-full">
                            {new Array(gridWidth).fill(1).map((_, x) => {
                                return (
                                    <div className={cn("w-1/12 grow aspect-square items-center justify-center shadow-cell-base")}>
                                        <img src={grid[x][y].type == "goal" ? currentDay.islandToFind.path : grid[x][y].path} />
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
