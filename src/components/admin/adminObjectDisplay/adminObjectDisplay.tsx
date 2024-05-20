import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import Dialog from "src/components/common/dialog/dialog"
import { deleteCommentById } from "src/library/api/commentfetch"
import { deletePredictionById } from "src/library/api/predictionfetch"
import { deleteUserById } from "src/library/api/userfetch"
import { IApiComment } from "src/models/commentmodels"
import { IApiPrediction } from "src/models/predictionmodels"
import { IUser } from "src/models/usermodels"

interface AdminObjectDisplayProps {
	adminObject: IApiPrediction | IUser | IApiComment,
	category: string
}
const AdminObjectDisplay: React.FC<AdminObjectDisplayProps> = ({ adminObject, category }) => {
	const [modalView, setModalView] = useState(false);
	const [cookie] = useCookies(["userInfo"])

	const deleteButtonHandler = () => {
		setModalView(true)
	}

	async function deleteItemHandler() {
		if (cookie.userInfo.token && adminObject._id) {
			switch (category) {
				case "predictions":
					await deletePredictionById(adminObject._id, cookie.userInfo?.token)
					break;
				case "users":
					await deleteUserById(adminObject._id, cookie.userInfo?.token)
					break;
				case "comments":
					await deleteCommentById(adminObject._id, cookie.userInfo?.token)
					break;
			}
			setModalView(false)
		}
	}

	useEffect(() => {
	}, [category])

	return (
		<>
			<div className={"relative h-full w-full border flex flex-col justify-between"}>
				{modalView &&
					<div>
						<Dialog setVisibility={setModalView} callback={deleteItemHandler} />
					</div>
				}
				<div>
					{
						Object.entries(adminObject).map(([key, value]) => {
							return (
								<>
									<div className={"overflow-auto text-sm px-1"}>{`${key}: \u00A0${value}`}</div>
								</>
							)
						})
					}
				</div>
				<button onClick={deleteButtonHandler} className={"btn-primary w-1/4 bg-cinna flex self-end m-2"}>delete</button>
			</div>
		</>
	)
}
export default AdminObjectDisplay
