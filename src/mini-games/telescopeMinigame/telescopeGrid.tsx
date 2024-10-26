import { useAudio } from "../../audio/AudioProvider"
import { useGameState } from "../../game-state"
import { IslandState } from "../../types/islands-state"
import { cn } from "../../util"
import { AUDIO_FIND_ISLAND } from "./TelescopeMiniGame"

const width = 20
const height = 9

export const TelescopeGrid = () => {
    const { islands } = useGameState()

    return (
        <div className="flex pointer-events-auto flex-1 flex-col items-center justify-center">
            {new Array(height).fill(1).map((_, y) => (
                <div className="flex flex-row flex-1 grow w-full">
                    {new Array(width).fill(1).map((_, x) => {
                        const island = islands.get.find(island => island.gridPosition.x === x && island.gridPosition.y === y)
                        if (island) {
                            return <Cell imageToRender={island} />
                        } else {
                            return <div className="bg-blue-600 w-1/12 grow aspect-square items-center justify-center " />
                        }
                    })}
                </div>
            ))}
        </div>
    )
}

const Cell = ({ imageToRender }: { imageToRender: IslandState }) => {
    const { islandToFind, activeMiniGame, gamesCompleted, activeSpeechBubble } = useGameState()
    const audio = useAudio()

    const onClick = () => {
        if (imageToRender.name === islandToFind.name) {
            audio.playEffect(AUDIO_FIND_ISLAND)
            activeSpeechBubble.set(`Good job you found ${islandToFind.name}, not bad for a landlubber!`)
            gamesCompleted.add("Telescope Mini Game")
            activeMiniGame.set(undefined)
        } else {
            //todo add some effect for wrong answer
            activeSpeechBubble.set(`WHAT ARE YOU DOING? YOU ARE SUPPOSED TO FIND ${islandToFind.name.toUpperCase()}, NOT ${imageToRender.name.toUpperCase()}!`)
        }
    }

    return (
        <div className={cn("bg-blue-600 w-1/12 grow aspect-square items-center justify-center")}>
            <img onClick={onClick} className="bg-cover" src={imageToRender.path} alt={imageToRender.name} />
        </div>
    )
}
