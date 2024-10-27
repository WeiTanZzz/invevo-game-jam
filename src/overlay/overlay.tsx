import { ReactNode } from "react"

export const Overlay = ({ children }: { children: ReactNode }) => {
    return <div className="text-left pointer-events-none z-10 absolute w-full h-full flex items-start justify-between">{children}</div>
}
