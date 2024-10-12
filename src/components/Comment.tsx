import { Children } from "@/types/generalTypes"
import { UserIcon } from "../../public/icons/User"

interface Props {
    children: Children;
    key: string;
}

export const Comment = ({key, children}: Props) => {
    return (
        <div key={key} className="flex gap-2 m-4">
            <span className="mt-2">
                <UserIcon />
            </span>
            <div className="flex flex-col bg-slate-100 py-2 px-4 rounded-md ">
                <span className="text-xs text-primary-600">Anonymous</span>
                <p className="text-sm">{children}</p>
            </div>
        </div>
    )
}