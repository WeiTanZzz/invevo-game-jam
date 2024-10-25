import { useGameState } from "../game-state"
import { Slot } from "./slot"

export const PlayerInventory = () => {
    const { items } = useGameState()

    const inventory = items.get.filter(item => item.inventorySource === "player-inventory")

    return (
        <div
            className="grid gap-4"
            style={{
                gridTemplateRows: `repeat(4, 80px)`,
                gridTemplateColumns: `repeat(2, 80px)`
            }}
        >
            {[...Array(8)].map((_, index) => {
                const filledSlot = inventory.find(item => item.inventoryPosition === index)
                return <Slot key={index} itemType={filledSlot?.type} inventoryPosition={index} inventorySource="player-inventory" />
            })}
        </div>
    )
}
