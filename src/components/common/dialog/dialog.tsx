import { SetStateAction } from "react";
import PortalComponent from "../portal/portal";

interface DialogProps {
	setVisibility: React.Dispatch<SetStateAction<boolean>>,
	callback: () => Promise<void>

}
const Dialog: React.FC<DialogProps> = ({ setVisibility, callback }) => {
	return (
		<PortalComponent>
			<div className={"absolute top-0 left-0 bottom-0 right-0 h-full w-full bg-gray-200 flex items-center justify-center bg-opacity-80"}>
				<div className={"h-1/4 w-1/2 bg-gray-200 flex flex-col justify-evenly rounded border-2 border-cyan-500"}>
					<div className={"m-2 flex self-center"}>Are you sure?</div>
					<div className={"flex m-2 items-center justify-center"}>
						<button className={"btn-primary w-1/3"} onClick={() => { setVisibility(false) }}>cancel</button>
						<button className={"btn-primary w-1/3 bg-cinna"} onClick={() => { callback() }}>delete</button>
					</div>
				</div>
			</div>
		</PortalComponent>
	)
}
export default Dialog;
