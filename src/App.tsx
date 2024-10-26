import { DragAndDropProvider } from "./drag-and-drop-provider.tsx"
import { useGameState } from "./game-state"
import { Inventory } from "./inventory/inventory.tsx"
import { Map } from "./map/map.tsx"
import { GAMES } from "./mini-games/games.tsx"
import { Overlay } from "./overlay/overlay.tsx"
import { Speech } from "./overlay/speech.tsx"

function App() {
    const { activeMiniGame } = useGameState()

    return (
        <DragAndDropProvider>
            <Overlay>
                <Speech />
            </Overlay>
            {activeMiniGame.get !== undefined ? (
                <>{GAMES.find(g => activeMiniGame.get === g.name)?.component}</>
            ) : (
                <>
                    <Map />
                    <Pos />
                    <Inventory id="chest-one" width={1} height={4} colour="bg-blue-300" />
                    <Inventory id="player-inventory" width={2} height={4} colour="bg-orange-300" />
                    <Inventory id="chest-two" width={2} height={2} colour="bg-blue-300" />
                </>
            )}
        </DragAndDropProvider>
    )
}

export default App

const Pos = () => {
    const { grid } = useGameState()
    return (
        <span>
            {grid.x}, {grid.y}
        </span>
    )
}
