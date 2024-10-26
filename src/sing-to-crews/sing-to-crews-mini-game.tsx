const crews: {
    id: number
    name: string
    status: "normal" | "happy" | "sad" | "ghost"
}[] = [
    { id: 1, name: "John", status: "normal" },
    { id: 2, name: "Jane", status: "happy" },
    { id: 3, name: "Jack", status: "sad" },
    { id: 4, name: "Jill", status: "ghost" }
]

const SingToCrewsMiniGame = () => {
    return (
        <div className={"w-svw h-svh bg-black bg-cover bg-[url('/images/sing-to-crew/bg.webp')]"}>
            {crews.map(crew => (
                <Crew id={crew.id} name={crew.name} status={crew.status} />
            ))}
        </div>
    )
}

type CrewProps = {
    id: number
    name: string
    status: "normal" | "happy" | "sad" | "ghost"
}

const Crew = ({ id, name, status }: CrewProps) => {
    return (
        <div className={"size-64"}>
            <div>{name}</div>
            <img src={`/images/sing-to-crew/crew_${status}.png`} alt={`Crew member ${id}`} />
        </div>
    )
}

export default SingToCrewsMiniGame
