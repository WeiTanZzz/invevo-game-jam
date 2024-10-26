import SingToCrewsMiniGame from "./sing-to-crews/sing-to-crews-mini-game"
import { TelescopeMiniGame } from "./telescopeMinigame/TelescopeMiniGame"

export const GAMES: {
    name: string
    component: React.ReactNode
    bgm: string
}[] = [
    {
        name: "Telescope Mini Game",
        component: <TelescopeMiniGame />,
        bgm: "/audio/bgm/sailing.mp3"
    },
    {
        name: "Sing to Crews",
        component: <SingToCrewsMiniGame />,
        bgm: "/audio/bgm/board.mp3"
    }
]
