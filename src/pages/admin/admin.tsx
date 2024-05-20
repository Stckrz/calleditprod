import { useEffect, useState } from "react";
import Layout from "pages/layout/layout";
import Pagination from "src/components/common/pagination/pagination";
import AdminObjectDisplay from "src/components/admin/adminObjectDisplay/adminObjectDisplay";
import { getAllUsers, getUserByUsername } from "src/library/api/userfetch";
import { getAllComments, getCommentById } from "src/library/api/commentfetch";
import { getPredictionById, getPredictions } from "src/library/api/predictionfetch";
import { IApiPrediction } from "src/models/predictionmodels";
import { IUser } from "src/models/usermodels";
import { IApiComment } from "src/models/commentmodels";
import { useCookies } from "react-cookie";
import SelectionList from "src/components/common/selectionList/selectionList";


export interface AdminObject {
	_id: string,
	title: string,
	category: string
}

const AdminPage: React.FC = () => {
	const [categories] = useState<AdminObject[]>([
		{ _id: "0", title: "users", category: "category" },
		{ _id: "1", title: "predictions", category: "category" },
		{ _id: "2", title: "comments", category: "category" }
	])
	const [currentCategory, setCurrentCategory] = useState({ _id: "0", title: "users", category: "category" })
	const [cookie] = useCookies(["userInfo"])

	const [selectionArray, setSelectionArray] = useState<AdminObject[]>([]);
	const [selectedObject, setSelectedObject] = useState<IUser | IApiComment | IApiPrediction>()
	const [selectedObjectCategory, setSelectedObjectCategory] = useState("")

	const [itemCount, setItemCount] = useState(0)
	const [feedPage, setFeedPage] = useState(1);

	async function getItems(selection: AdminObject) {
		setCurrentCategory(selection)
		const tempArray: AdminObject[] = [];
		switch (selection.title) {
			case "users": {
				setItemCount(0)
				const users = await getAllUsers()
				users.map((user: IUser) => {
					tempArray.push({
						_id: user._id,
						title: user.username,
						category: "users"
					})
				})
				break;
			}
			case "predictions": {
				const predictions = await getPredictions({ page: feedPage })
				setItemCount(predictions.count)
				predictions.predictions.map((prediction: IApiPrediction) => {
					if (prediction._id) {
						tempArray.push({
							_id: prediction._id,
							title: prediction.title,
							category: "predictions"
						})
					}
				})
				break;
			}
			case "comments": {
				setItemCount(0)
				const comments = await getAllComments()
				comments.map((comment: IApiComment) => {
					tempArray.push({
						_id: comment._id,
						title: comment.title,
						category: "comments"
					})
				})
				break;
			}
		}
		setSelectionArray(tempArray)
	}

	async function getSelectedObject(selection: AdminObject) {
		switch (selection.category) {
			case "users":
				setSelectedObject(await getUserByUsername(selection.title))
				setSelectedObjectCategory("users")
				break;
			case "comments":
				setSelectedObject(await getCommentById(selection._id))
				setSelectedObjectCategory("comments")
				break;
			case "predictions":
				setSelectedObject(await getPredictionById(selection._id))
				setSelectedObjectCategory("predictions")
				break;
		}
	}


	useEffect(() => {
		getItems(currentCategory)
	}, [feedPage])

	return (
		<>
			<Layout>
				{cookie.userInfo?.roles?.includes("admin") ?
					<div className={"flex w-full h-96 gap-2 m-2"}>
						<div className={"w-1/6 h-full border border-black"}>
							{
								<SelectionList objectArray={categories} fetchFunction={getItems} />
							}
						</div>
						<div className={"w-1/6 h-full border border-black flex flex-col"}>
							{itemCount !== 0 &&
								<div className={"h-1/12"}>
									<Pagination
										setPage={setFeedPage}
										page={feedPage}
										entryCount={itemCount}
										entryLimit={10}
									/>
								</div>
							}
							{selectionArray.length > 0 &&
								<SelectionList objectArray={selectionArray} fetchFunction={getSelectedObject} />
							}
						</div>
						<div className={"w-4/6 h-full border border-black p-2 flex flex-col gap-1"}>
							{selectedObject !== undefined &&
								<AdminObjectDisplay adminObject={selectedObject} category={selectedObjectCategory} />
							}
						</div>
					</div>
					: <div>you're not supposed to be here</div>
				}
			</Layout>
		</>
	)
}
export default AdminPage;
