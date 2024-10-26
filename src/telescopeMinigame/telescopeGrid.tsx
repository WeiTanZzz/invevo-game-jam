import { useGameState } from "../game-state"
import { cn } from "../util"

const width = 20
const height = 9

export const TelescopeGrid = () => {
    const { islands } = useGameState()

    return (
        <div className="flex flex-col grow">
            {new Array(height).fill(1).map((_, y) => (
                <div className="flex flex-row">
                    {new Array(width).fill(1).map((_, x) => {
                        const xCord = x + 1
                        const yCord = y + 1
                        const idx = xCord * yCord

                        islands.some(island => {
                            if (island.gridPosition === idx) {
                                console.log(island, "hefwnsfw")
                                return <Cell key={idx} idx={idx} imageToRender={island.island} />
                            }
                        })
                        return <Cell key={idx} idx={idx} imageToRender="./sea.png" />
                    })}
                </div>
            ))}
        </div>
    )
}

const Cell = ({ idx, imageToRender }: { idx: number; imageToRender: string }) => {
    const onClickCell = () => {
        console.log("Clicked on cell:", idx)
    }

    return (
        <div onClick={onClickCell} className={cn("size-24 items-center justify-center border border-red hover:bg-zinc-50")}>
            {
                <span>
                    <img src={imageToRender} alt="cell image" />
                </span>
            }
        </div>
    )
}
// export const TelescopeGrid = () => {
//     return (
//         <div className="flex flex-col grow bg-blue-600">
//             <div className="flex flex-row">
//                 <Grid gridSize={20} />
//             </div>
//         </div>
//     )
// }

// export const TelescopeGrid = () => {
//     const gridWidth = 20
//     const gridHeight = 10
//     const [islandPosition, setIslandPosition] = useState<number | null>(null)

//     useEffect(() => {
//         // Set a random position for the island when the component mounts
//         setIslandPosition(randomPosition)
//     }, [gridWidth, gridHeight])

//     const Cell = ({ isIsland }: { isIsland: boolean }) => (
//         <div className={cn("size-24 items-center justify-center border border-red hover:bg-zinc-50")}>
//             {isIsland && <img src="./island To Find.png" alt="map" />}
//         </div>
//     )

//     return (
//         <div className="flex flex-col grow bg-blue-600">
//             <div className="flex flex-row">
//                 <div
//                     className="grid"
//                     style={{
//                         display: "grid",
//                         gridTemplateColumns: `repeat(${gridWidth + gridHeight}, 1fr)`,
//                         gap: "5px"
//                     }}
//                 >
//                     {Array.from({ length: gridWidth * gridHeight }).map((_, index) => (
//                         <Cell key={index} isIsland={index === islandPosition} />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     )
// }
