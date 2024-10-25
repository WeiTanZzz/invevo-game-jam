import { TelescopeMiniGame } from "./TelescopeMiniGame"
import BackgroundMusic from "./audio/BackgroundMusic.tsx"
import { GameStateProvider } from "./game-state"
import { Inventory } from "./inventory/inventory.tsx"
import { Grid } from "./map/grid"

function App() {
    return (
        <GameStateProvider>
            <BackgroundMusic />
            <Grid />
            <Inventory />
            <TelescopeMiniGame />
        </GameStateProvider>
    )
}

export default App
