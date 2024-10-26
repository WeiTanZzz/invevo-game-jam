import { ItemState } from "./item-state"
import { ItemType } from "./item-type"

export type SlotState = {
    itemType: ItemType | undefined
} & Omit<ItemState, "type">
