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
    { x: 9, y: 11 },
    { x: 10, y: 11 },
    { x: 14, y: 6 }
]

//const triggerCells: Coordinate & { name: GAMES[number]["name"] })[] = [

export const hiddenCells = [...edgeCells, ...innerCells] as const
