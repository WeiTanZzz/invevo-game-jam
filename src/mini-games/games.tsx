import SingToCrewsMiniGame from "./sing-to-crews/sing-to-crews-mini-game"
import { TelescopeMiniGame } from "./telescopeMinigame/TelescopeMiniGame"

export const GAMES: {
    name: string
    component: React.ReactNode
    music: string
}[] = [
    {
        name: "Telescope Mini Game",
        component: <TelescopeMiniGame />,
        music: "/audio/bgm/sailing.mp3"
    },
    {
        name: "Sing to Crews",
        component: <SingToCrewsMiniGame />,
        music: "/audio/bgm/board.mp3"
    }
]
