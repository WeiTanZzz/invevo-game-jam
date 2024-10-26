import { ReactNode } from "react"

export const Overlay = ({ children }: { children: ReactNode }) => {
    return <div className="text-left absolute w-full h-full ml-10 flex items-start">{children}</div>
}
