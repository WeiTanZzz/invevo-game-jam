import { useAudio } from "../../audio/AudioProvider"
import { useGameState } from "../../game-state"
import { IslandState } from "../../types/islands-state"
import { cn } from "../../util"
import { AUDIO_FIND_ISLAND } from "./TelescopeMiniGame"

const width = 25
const height = 11

export const TelescopeGrid = () => {
    const { minigames } = useGameState()

    return (
        <div className="flex pointer-events-auto flex-1 flex-col items-center justify-center w-full mt-28">
            {new Array(height).fill(1).map((_, y) => (
                <div className="flex flex-row flex-1 grow w-full">
                    {new Array(width).fill(1).map((_, x) => {
                        checkIslandsAreOnUniqueGridPositions(minigames.telescope)
                        const island = minigames.telescope.islands.find(island => island.gridPosition.x === x && island.gridPosition.y === y)
                        if (island) {
                            return <Cell imageToRender={island} />
                        } else {
                            return <div className="bg-blue-600 w-1/12 grow aspect-square items-center justify-center" />
                        }
                    })}
                </div>
            ))}
        </div>
    )
}

const checkIslandsAreOnUniqueGridPositions = (currentDay: { islands: IslandState[] }) => {
    currentDay.islands.forEach((island, index) => {
        currentDay.islands.forEach((otherIsland, otherIndex) => {
            if (index !== otherIndex && island.gridPosition.x === otherIsland.gridPosition.x && island.gridPosition.y === otherIsland.gridPosition.y) {
                island.gridPosition = { x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height) }
                checkIslandsAreOnUniqueGridPositions(currentDay)
            }
        })
    })
}

const Cell = ({ imageToRender }: { imageToRender: IslandState }) => {
    const { activeSpeechBubble, completeGame, minigames } = useGameState()
    const audio = useAudio()

    const onClick = () => {
        if (imageToRender.name === minigames.telescope.islandToFind.name) {
            audio.playEffect(AUDIO_FIND_ISLAND)
            activeSpeechBubble.set(`Well done! Ye’ve spotted ${minigames.telescope.islandToFind.name}, not bad fer a landlubber! Just remember, even a blind fish finds its way now and then...`)
            completeGame()
        } else {
            activeSpeechBubble.set(
                `What in Davy Jones' locker are ye doin'?! Ye’re supposed to be findin' ${minigames.telescope.islandToFind.name.toUpperCase()}, not ${imageToRender.name.toUpperCase()}! Do ye fancy a swim with the sea monsters, ye addled-brain swab?!`
            )
        }
    }

    return (
        <div className={cn("bg-blue-600 w-1/12 grow aspect-square items-center justify-center")}>
            <img onClick={onClick} className="bg-cover" src={imageToRender.path} alt={imageToRender.name} />
        </div>
    )
}
