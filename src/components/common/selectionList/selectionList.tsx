import { useState } from "react";
import { AdminObject } from "src/pages/admin/admin";

interface SelectionListProps {
	objectArray: AdminObject[],
	fetchFunction: (categoryId: AdminObject) => Promise<void>;
}
const SelectionList: React.FC<SelectionListProps> = ({ objectArray, fetchFunction }) => {
	const [currentItemTitle, setCurrentItemTitle] = useState("");

	const itemClickHandler = (item: AdminObject) => {
		fetchFunction(item)
		setCurrentItemTitle(item.title)
	}
	return (
		<>
			{objectArray.map((object: AdminObject) => {
				return (
					<div
						key={object._id}
						className={object.title === currentItemTitle
							? "px-1 bg-cyan-500 text-sm cursor-pointer"
							: "px-1 bg-white text-sm cursor-pointer"}
						onClick={() => { itemClickHandler(object) }}
					>
						{object.title}
					</div>
				)
			})}
		</>
	)
}
export default SelectionList;
