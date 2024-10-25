import { Grid } from "./grid"

export const Map = () => {
    return (
        <div
            className="flex flex-1 bg-contain bg-no-repeat bg-center items-center justify-center bg-blue-200 overflow-hidden"
            style={{ backgroundImage: 'url("./ship.png")' }}
        >
            <div className="flex items-center justify-center">
                <Grid />
            </div>
        </div>
    )
}
