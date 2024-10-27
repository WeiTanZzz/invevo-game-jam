import { CannonballReload } from "./cannonballReloadMiniGame/cannonballReload.tsx"
import { CheckTheIslandMiniGame } from "./checkTheIslandMiniGame/CheckTheIslandMiniGame.tsx"
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
        name: "Sail the Seven Seas",
        component: <NavigationMinigame />,
        music: "/audio/bgm/board.mp3"
    },
    {
        name: "Raise the sail",
        component: <RaiseSailClicker />,
        music: "/audio/bgm/sailing.mp3"
    },
    {
        name: "Check the island",
        component: <CheckTheIslandMiniGame />,
        music: "/audio/bgm/sailing.mp3"
    },
    {
        name: "Reload the cannon",
        component: <CannonballReload />,
        music: "/audio/bgm/sailing.mp3"
    },
    {
        name: "Sing to Crews",
        component: <SingToCrewsMiniGame />,
        music: "/audio/bgm/sailing.mp3"
    }
] as const
