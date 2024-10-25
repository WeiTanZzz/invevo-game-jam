import { ItemState } from "./item-state"
import { ItemType } from "./item-type"

export type SlotState = {
    type: ItemType | undefined
} & Omit<ItemState, "type">
