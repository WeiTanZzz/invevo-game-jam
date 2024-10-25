import { DndContext, DragOverlay, DragStartEvent } from "@dnd-kit/core"
import { useState } from "react"
import { TelescopeMiniGame } from "./TelescopeMiniGame"
import { useAudio } from "./audio/AudioProvider.tsx"
import { GameStateProvider } from "./game-state"
import { Item } from "./inventory/item.tsx"
import { PlayerInventory } from "./inventory/player-inventory.tsx"
import { Grid } from "./map/grid.tsx"
import { DraggedItem } from "./types/dragged-item.ts"

function App() {
    const audioManager = useAudio()
    const [inTelescopeMiniGame, setInTelescopeMiniGame] = useState(false)

    const [draggedItem, setDraggedItem] = useState<DraggedItem>()

    const onDragStart = (event: DragStartEvent) => {
        const data = event.active.data.current
        if (data !== undefined) {
            setDraggedItem(data as DraggedItem)
        }
    }

    return (
        <GameStateProvider>
            <DndContext onDragStart={onDragStart} onDragEnd={() => setDraggedItem(undefined)}>
                <DragOverlay>{draggedItem && <Item item={draggedItem.type} />}</DragOverlay>

                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => {
                        if (!inTelescopeMiniGame) {
                            audioManager.setBGM("/audio/bg/007.mp3")
                        } else {
                            audioManager.toggleBackgroundPlayPause()
                        }

                        setInTelescopeMiniGame(!inTelescopeMiniGame)
                    }}
                >
                    {inTelescopeMiniGame ? "exit telescop mini game" : "enter Telescope Mini Game "}
                </button>
                {inTelescopeMiniGame ? (
                    <TelescopeMiniGame />
                ) : (
                    <>
                        <Grid />
                        <PlayerInventory />
                    </>
                )}
            </DndContext>
        </GameStateProvider>
    )
}

export default App
