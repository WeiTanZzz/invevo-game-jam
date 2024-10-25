import { GameStateProvider } from "./game-state"
import { TelescopeMiniGame } from "./TelescopeMiniGame"
import BackgroundMusic from "./audio/BackgroundMusic.tsx"
import { Grid } from "./map/grid"

function App() {
    return (
        <GameStateProvider>
            <BackgroundMusic />
            <Grid />
            <TelescopeMiniGame />
        </GameStateProvider>
    )
}

export default App
