import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core"
import { createContext, ReactNode, useContext, useState } from "react"
import { useGameState } from "./game-state"
import { Item } from "./inventory/item"
import { getItemId, ItemState } from "./types/item-state"
import { SlotState } from "./types/slot-state"

const DragAndDropContext = createContext<ItemState | undefined>(undefined)

export const useDragAndDrop = () => useContext(DragAndDropContext)

export const DragAndDropProvider = ({ children }: { children: ReactNode }) => {
    const { items } = useGameState()

    const [draggedItem, setDraggedItem] = useState<ItemState>()

    const onDragStart = (event: DragStartEvent) => {
        const data = event.active.data.current
        if (data !== undefined) {
            setDraggedItem(data as ItemState)
        }
    }

    const onDragEnd = (event: DragEndEvent) => {
        setDraggedItem(undefined)

        const droppable = event.over?.data?.current as SlotState | undefined
        if (draggedItem === undefined || droppable === undefined) {
            return
        }

        const isSlotOccupied =
            items.get.find(item => item.inventoryPosition === droppable.inventoryPosition && item.inventorySource === droppable.inventorySource) !== undefined

        if (isSlotOccupied) {
            return
        }

        items.set(
            items.get.map(item => {
                if (getItemId(item) === getItemId(draggedItem)) {
                    return { ...item, inventorySource: droppable.inventorySource, inventoryPosition: droppable.inventoryPosition }
                }
                return item
            })
        )
    }

    return (
        <DragAndDropContext.Provider value={draggedItem}>
            <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
                <DragOverlay>{draggedItem && <Item item={draggedItem} />}</DragOverlay>
                {children}
            </DndContext>
        </DragAndDropContext.Provider>
    )
}
