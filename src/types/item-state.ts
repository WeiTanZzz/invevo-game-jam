import { ItemType } from "./item-type"

export type ItemState = {
    type: ItemType
    inventorySource: "player-inventory"
    inventoryPosition: number
}
