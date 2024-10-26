import { useGameState } from "../game-state"
import { ItemState } from "../types/item-state"
import { Slot } from "./slot"

type Props = {
    id: ItemState["inventorySource"]
    width: number
    height: number
    colour: string
}

export const Inventory = ({ id, width, height, colour }: Props) => {
    const { items } = useGameState()

    const inventory = items.get.filter(item => item.inventorySource === id)

    return (
        <div
            className="grid gap-2 p-2"
            style={{
                gridTemplateColumns: `repeat(${width}, 80px)`,
                gridTemplateRows: `repeat(${height}, 80px)`
            }}
        >
            {[...Array(width * height)].map((_, index) => {
                const filledSlot = inventory.find(item => item.inventoryPosition === index)
                return <Slot key={index} itemType={filledSlot?.type} inventoryPosition={index} inventorySource={id} colour={colour} />
            })}
        </div>
    )
}
