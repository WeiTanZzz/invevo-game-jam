import { useDraggable } from "@dnd-kit/core"
import { ItemState } from "../types/item-state"

export const Item = ({ item }: { item: ItemState | undefined }) => {
    const { attributes, listeners, setNodeRef } = useDraggable({
        id: JSON.stringify(item),
        data: item
    })

    return (
        <div ref={setNodeRef} {...listeners} {...attributes} className="size-20 p-1">
            {item && <img className="w-full h-full" src={`./items/${getImageName(item.type)}.png`} alt={item.type} />}
        </div>
    )
}

const getImageName = (item: string) => item.replace(" ", "-").toLowerCase()
