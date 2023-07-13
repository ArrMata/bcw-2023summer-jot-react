import Icon from "@mdi/react"
import { mdiFountainPen } from "@mdi/js"

export const ActiveNotePlaceholder = () => {
    return (
        <div className='flex flex-col text-5xl text-zinc-100 items-center'>
            <Icon
                path={mdiFountainPen}
                size={8}
            />
            <h2>Select or Create a Note!</h2>
        </div>
    )
}