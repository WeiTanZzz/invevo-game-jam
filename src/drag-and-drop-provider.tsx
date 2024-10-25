import { DndContext, DragOverlay, DragStartEvent } from "@dnd-kit/core"
import { createContext, ReactNode, useContext, useState } from "react"
import { Item } from "./inventory/item"
import { ItemState } from "./types/item-state"

const DragAndDropContext = createContext<ItemState | undefined>(undefined)

export const useDragAndDrop = () => useContext(DragAndDropContext)

export const DragAndDropProvider = ({ children }: { children: ReactNode }) => {
    const [draggedItem, setDraggedItem] = useState<ItemState>()

    const onDragStart = (event: DragStartEvent) => {
        const data = event.active.data.current
        if (data !== undefined) {
            setDraggedItem(data as ItemState)
        }
    }

    return (
        <DragAndDropContext.Provider value={draggedItem}>
            <DndContext onDragStart={onDragStart} onDragEnd={() => setDraggedItem(undefined)}>
                <DragOverlay>{draggedItem && <Item item={draggedItem} />}</DragOverlay>
                {children}
            </DndContext>
        </DragAndDropContext.Provider>
    )
}
