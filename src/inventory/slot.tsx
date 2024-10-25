import { useDroppable } from "@dnd-kit/core"
import { useDragAndDrop } from "../drag-and-drop-provider"
import { ItemType } from "../types/item-type"
import { Item } from "./item"

type Props = {
    itemType: ItemType | undefined
    inventorySource: "player-inventory"
    inventoryPosition: number
}
export const Slot = ({ itemType, inventorySource, inventoryPosition }: Props) => {
    const { setNodeRef } = useDroppable({
        id: inventorySource + inventoryPosition.toString()
    })

    const draggedItem = useDragAndDrop()
    const isDraggingThisSlotsItem =
        draggedItem !== undefined &&
        itemType !== undefined &&
        draggedItem.type === itemType &&
        draggedItem.inventorySource === inventorySource &&
        draggedItem.inventoryPosition === inventoryPosition

    return (
        <div ref={setNodeRef} className="bg-orange-300">
            {itemType && !isDraggingThisSlotsItem && <Item item={{ type: itemType, inventorySource, inventoryPosition }} />}
        </div>
    )
}
