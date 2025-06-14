import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { generateAvatarUri } from "@/lib/avatar"
import { DefaultVideoPlaceholder, StreamVideoParticipant, ToggleAudioPreviewButton, ToggleVideoPreviewButton, useCallStateHooks, VideoPreview } from "@stream-io/video-react-sdk"
import { LogInIcon } from "lucide-react"
import Link from "next/link"
import "@stream-io/video-react-sdk/dist/css/styles.css";

interface Props{
    onJoin: () => void
};

const DisabledVideoPreview = () =>{
    const { data } = authClient.useSession();

    return(
        <DefaultVideoPlaceholder 
            participant={
                {
                    name: data?.user.name ?? "",
                    image: 
                        data?.user.image ??
                        generateAvatarUri({
                            seed: data?.user.name ?? "",
                            variant: "initials",
                        }),
                } as StreamVideoParticipant
            } 
        />
    )
};

const AllowBrowserPermissions = () =>{
    return(
        <p className="text-sm">
           Please grant your browser a permision to access your camera and microphone.
        </p>
    )
}


export const CallLobby = ({ onJoin} : Props) =>{

    const { useCameraState, useMicrophoneState } = useCallStateHooks();

    const { hasBrowserPermission: hasMicPermision } = useMicrophoneState();
    const { hasBrowserPermission: hasCameraPermission } = useCameraState();

    const hasBrowserMediaPermision = hasCameraPermission && hasMicPermision;

    return (
        <div className="flex flex-col items-center justify-center h-full bg-radial from-sidebar-accent to-sidebar">
            <div className="py-4 px-8 flex flex-1 items-center justify-center">
                <div className=" flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-8 shadow-sm">
                    <div className="flex flex-col gap-y-2 text-center">
                        <h6 className="text-lg font-bold bg-gradient-to-r from-slate-500 to-slate-300 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                            Ready to connect?
                        </h6>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Set up your audio and video before joining</p>
                            <VideoPreview
                            DisabledVideoPreview={hasBrowserMediaPermision ? DisabledVideoPreview : AllowBrowserPermissions}
                        />
                    </div>
                    <div className="flex gap-x2">
                        <ToggleAudioPreviewButton/>
                        <ToggleVideoPreviewButton/>
                    </div>
                     <div className="flex gap-x-2 justify-between w-full">
                        <Button asChild variant={"ghost"}>
                            <Link href={"/meetings"}>
                                Cancel
                            </Link>
                        </Button>
                        <Button onClick={onJoin}>
                            <LogInIcon/>
                            Join Call
                        </Button>
                     </div>
                </div>
            </div>
        </div>
    )


}

