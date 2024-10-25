import { Grid } from "./grid"

export const Map = () => {
    return (
        <div
            className="flex grow bg-contain h-full w-full bg-no-repeat bg-center items-center justify-center bg-blue-200 overflow-hidden"
            style={{ backgroundImage: 'url("./ship.png")' }}
        >
            <div className="w-full h-full py-[11%] ps-[10%] pe-[22%]">
                <Grid />
            </div>
        </div>
    )
}
