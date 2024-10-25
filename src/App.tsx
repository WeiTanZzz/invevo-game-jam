import { TelescopeMiniGame } from "./TelescopeMiniGame"
import BackgroundMusic from "./audio/BackgroundMusic.tsx"
import { Grid } from "./map/grid"

function App() {
    return (
        <>
            <BackgroundMusic />
            <Grid />
            <TelescopeMiniGame />
        </>
    )
}

export default App
