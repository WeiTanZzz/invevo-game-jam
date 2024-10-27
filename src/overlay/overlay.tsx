import { ReactNode } from "react"

export const Overlay = ({ children }: { children: ReactNode }) => {
    return <div className="text-left pointer-events-none z-10 absolute max-w-full h-full ml-10 flex items-start justify-between">{children}</div>
}
