import { GAMES } from "../mini-games/games"

export const GRID_WIDTH = 31
export const GRID_HEIGHT = 11

export type Coordinate = { x: number; y: number }

const edgeCells: Coordinate[] = [
    ...Array.from({ length: 5 }, (_, i) => ({ x: i + 1, y: 1 })),
    ...Array.from({ length: 5 }, (_, i) => ({ x: i + 1, y: 2 })),
    ...Array.from({ length: 5 }, (_, i) => ({ x: GRID_WIDTH - i, y: 1 })),
    ...Array.from({ length: 3 }, (_, i) => ({ x: GRID_WIDTH - i, y: 2 })),
    ...Array.from({ length: 2 }, (_, i) => ({ x: GRID_WIDTH - i, y: 3 })),
    ...Array.from({ length: 2 }, (_, i) => ({ x: GRID_WIDTH - i, y: GRID_HEIGHT - 2 })),
    ...Array.from({ length: 3 }, (_, i) => ({ x: GRID_WIDTH - i, y: GRID_HEIGHT - 1 })),
    ...Array.from({ length: 5 }, (_, i) => ({ x: GRID_WIDTH - i, y: GRID_HEIGHT })),
    ...Array.from({ length: 5 }, (_, i) => ({ x: GRID_WIDTH, y: GRID_HEIGHT - i - 3 })),
    ...Array.from({ length: 5 }, (_, i) => ({ x: i + 1, y: GRID_HEIGHT - 1 })),
    ...Array.from({ length: 5 }, (_, i) => ({ x: i + 1, y: GRID_HEIGHT }))
] as const

const innerCells: Coordinate[] = [
    { x: 9, y: 1 },
    { x: 10, y: 1 },
    { x: 9, y: 11 },
    { x: 10, y: 11 }
]

export const triggerCells: (Coordinate & { name: (typeof GAMES)[number]["name"] })[] = [
    { x: 14, y: 6, name: "Telescope Mini Game" },
    { x: 6, y: 6, name: "Sail the Seven Seas" },
    { x: 24, y: 6, name: "Raise the sail" },
    { x: 8, y: 6, name: "Check the island" },
    { x: 17, y: 1, name: "Reload the cannon" },
    { x: 15, y: 1, name: "Reload the cannon" },
    { x: 12, y: 1, name: "Reload the cannon" },
    { x: 10, y: 2, name: "Reload the cannon" },
    { x: 10, y: 10, name: "Reload the cannon" },
    { x: 17, y: 11, name: "Reload the cannon" },
    { x: 15, y: 11, name: "Reload the cannon" },
    { x: 12, y: 11, name: "Reload the cannon" },
    { x: 19, y: 11, name: "Reload the cannon" },
    { x: 19, y: 1, name: "Reload the cannon" },
    { x: 1, y: 7, name: "Reload the cannon" },
    { x: 1, y: 6, name: "Reload the cannon" },
    { x: 1, y: 5, name: "Reload the cannon" }
]

export const hiddenCells = [...edgeCells, ...innerCells] as const
