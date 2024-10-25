import { useDroppable } from "@dnd-kit/core"
import { useDragAndDrop } from "../drag-and-drop-provider"
import { getItemId } from "../types/item-state"
import { SlotState } from "../types/slot-state"
import { Item } from "./item"

type Props = SlotState & { colour: string }

export const Slot = ({ itemType, inventorySource, inventoryPosition, colour }: Props) => {
    const { setNodeRef } = useDroppable({
        id: inventorySource + inventoryPosition.toString(),
        data: { itemType, inventorySource, inventoryPosition }
    })

    const draggedItem = useDragAndDrop()
    const isDraggingThisSlotsItem =
        draggedItem !== undefined && itemType !== undefined && getItemId(draggedItem) === getItemId({ type: itemType, inventorySource, inventoryPosition })

    return (
        <div ref={setNodeRef} className={colour}>
            {itemType && !isDraggingThisSlotsItem && <Item item={{ type: itemType, inventorySource, inventoryPosition }} />}
        </div>
    )
}
