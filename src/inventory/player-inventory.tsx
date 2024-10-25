import { useState } from "react"
import { ItemType } from "../types/item-type"
import { Item } from "./item"

export const PlayerInventory = () => {
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
            {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-orange-300">
                    <Item item={inventory.find(s => s.position === i)?.item} />
                </div>
            ))}
        </div>
    )
}
