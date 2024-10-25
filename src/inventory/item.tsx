import { useDraggable } from "@dnd-kit/core"
import { ItemType } from "../types/item-type"

export const Item = ({ item }: { item: ItemType | undefined }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id: item + ":" + "player-inventory",
        data: {
            type: item,
            source: "player-inventory"
        }
    })

    return (
        <div ref={setNodeRef} {...listeners} {...attributes} className="size-20 p-1">
            {item && <img className="w-full h-full" src={`./items/${getImageName(item)}.png`} alt={item} />}
        </div>
    )
}

const getImageName = (item: string) => item.replace(" ", "-").toLowerCase()
