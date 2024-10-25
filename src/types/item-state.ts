import { ItemType } from "./item-type"

export type ItemState = {
    type: ItemType
    inventorySource: "player-inventory" | "chest-one" | "chest-two"
    inventoryPosition: number
}

export const getItemId = (item: ItemState) => item.inventorySource + item.inventoryPosition.toString() + item.type
