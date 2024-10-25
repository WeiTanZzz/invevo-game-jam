import { useState } from "react"

const items = ["Cannon Ball", "Rope"] as const
type Item = (typeof items)[number]
type Slot = { item: Item; position: number }

export const Inventory = () => {
    const [inventory, setInventory] = useState<Slot[]>([
        { item: items[0], position: 0 },
        { item: items[1], position: 4 }
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
                const actualItem = inventory.find(s => s.position === i)?.item
                return (
                    <div key={i} className="bg-orange-300 p-1">
                        {actualItem && <img className="w-full h-full" src={`./${getImageName(actualItem)}.png`} alt={actualItem} />}
                    </div>
                )
            })}
        </div>
    )
}

const getImageName = (item: string) => item.replace(" ", "-").toLowerCase()
