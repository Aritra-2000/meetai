"use client"

import {format} from "date-fns"
import { ColumnDef } from "@tanstack/react-table"
import { GeneratedAvatar } from "@/components/generated-avatar"
import { MeetingGetMany } from "../../types"
import { CircleCheckIcon, CircleXIcon, ClockArrowUpIcon, ClockFadingIcon, CornerDownRight, LoaderIcon, VideoIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import humanizeDuration from "humanize-duration"

function formatDuration(seconds: number){
    return humanizeDuration(seconds * 1000, {
        largest: 1,
        round: true,
        units:["h", "m", "s"],
    });
};

const statusIconMap = {
    upcoming: ClockArrowUpIcon,
    active: LoaderIcon,
    completed: CircleCheckIcon,
    processing: LoaderIcon,
    cancelled: CircleXIcon,
};

const satusColorMap = {
    upcoming: "bg-yellow-500/20 text-yellow-800 border-yellow-800/5",
    active: "bg-blue-500/20 text-blue-800 border-blue-800/5",
    completed: "bg-emerald-500/20 text-emerald-800 border-emerald-800/5",
    processing: "bg-gray-300/20 text-gray-800 border-gray-800/5",
    cancelled: "bg-rose-500/20 text-rose-800 border-rose-800/5",
}


export const columns: ColumnDef<MeetingGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Meeting Name",
    cell: ({ row }) =>(
        <div className="flex flex-col gap-y-1">
            <span className="font-semibold captialize">{row.original.name}</span>
                <div className="flex items-center gap-x-2">
                    <div className="flex items-center gap-x-1">
                        <CornerDownRight className="size-3 text-muted-foreground"/>
                        <span className="text-sm text-muted-foreground max-w-[200px] trunacate capitalize">
                            {row.original.agent.name}
                        </span>
                    </div>
                </div>
                <GeneratedAvatar
                   variant="botttsNeutral"
                   seed={row.original.agent.name}
                   className="size-4"
                />
                <span className="text-sm text-muted-foreground">
                   {row.original.startedAt ? format(row.original.startedAt, "MMM d") : ""}
                </span>
        </div>
    )
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) =>{
        const Icon = statusIconMap[row.original.status as keyof typeof statusIconMap];

        return(
            <Badge
              variant={"outline"}
              className={cn(
                   "captalize [&>svg]:size-4 text-muted-foreground",
                   satusColorMap[row.original.status as keyof typeof satusColorMap]
                )}
            >
                <Icon
                   className={cn(
                       row.original.status === "processing" && "animate-spin"
                )}
                />
                {row.original.status}
            </Badge>
        )} 
    },
    {
        accessorKey: "duration",
        header: "duration",
        cell: ({row}) =>(
            <Badge
              variant="outline"
              className="captalize [&>svg]:size-4 flex items-center gap-x-2"
            >
            <ClockFadingIcon className="text-blue-700"/>
              {row.original.duration ? formatDuration(row.original.duration): "No duration"}
            </Badge>
        ),
    }
];