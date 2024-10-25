import { useState } from "react"
import { useDragAndDrop } from "../drag-and-drop-provider"
import { ItemType } from "../types/item-type"
import { Item } from "./item"

export const PlayerInventory = () => {
    const draggedItem = useDragAndDrop()

    const [inventory, setInventory] = useState<{ item: ItemType; position: number }[]>([
        { item: "Cannon Ball", position: 0 },
        { item: "Rope", position: 4 }
    ])

    return (
        <div
            className="grid gap-4"
            style={{
                gridTemplateRows: `repeat(4, 80px)`,
                gridTemplateColumns: `repeat(2, 80px)`
            }}
        >
            {[...Array(8)].map((_, i) => {
                const filledSlot = inventory.find(s => s.position === i)
                const isDragging = draggedItem && draggedItem.inventorySource === "player-inventory" && draggedItem.inventoryPosition === i
                return (
                    <div key={i} className="bg-orange-300">
                        {filledSlot && !isDragging && (
                            <Item item={{ type: filledSlot.item, inventoryPosition: filledSlot.position, inventorySource: "player-inventory" }} />
                        )}
                    </div>
                )
            })}
        </div>
    )
}
