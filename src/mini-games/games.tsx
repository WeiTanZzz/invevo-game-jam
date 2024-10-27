import { NavigationMinigame } from "./navigation/navigationMinigame"
import { RaiseSailClicker } from "./raiseTheSailMiniGame/raiseTheSailMiniGame.tsx"
import SingToCrewsMiniGame from "./sing-to-crews/sing-to-crews-mini-game.tsx"
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
        name: "Sing to the Captain",
        component: <SingToCrewsMiniGame />,
        music: "/audio/bgm/board.mp3"
    },
    {
        name: "Sail the Seven Seas",
        component: <NavigationMinigame />,
        music: "/audio/bgm/board.mp3"
    },
    {
        name: "Raise the sail Mini Game",
        component: <RaiseSailClicker />,
        music: "/audio/bgm/sailing.mp3"
    }
] as const
