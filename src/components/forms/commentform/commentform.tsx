import { postNewComment } from 'src/library/api/commentfetch';
import React, { useState, useEffect, SetStateAction } from 'react';
import { useCookies } from 'react-cookie';
import { addPredictionComment } from 'src/library/api/predictionfetch';

interface CommentFormProps {
	parentId: string,
	getComments: Function,
	setShowCommentForm: React.Dispatch<SetStateAction<boolean>>
}

const CommentForm: React.FC<CommentFormProps> = ({ parentId, getComments, setShowCommentForm }) => {
	const [title, setTitle] = useState("");
	const [postBody, setPostBody] = useState("");
	const [commentError, setCommentError] = useState("");
	const [cookie] = useCookies(['userInfo']);

	async function handleCommentSubmit() {
		if (!cookie.userInfo) {
			setCommentError("Must be logged in to comment")
		} else {

			const commentData = {
				"author": cookie.userInfo.username,
				"title": title,
				"postBody": postBody,
				"parentId": parentId
			}
			let a = await postNewComment(commentData, cookie.userInfo?.token, parentId)
			if (a._id) {
				await addPredictionComment(a._id, parentId, cookie.userInfo?.token)
				setTitle("")
				setPostBody("")
				getComments()
				setShowCommentForm(false)
			} else {
				setCommentError(a.message)
			}
		}
	}

	return (
		<>
			<div className={"flex flex-col items-start justify-center gap-1"}>
				<div
					className={"w-full flex flex-col items-center justify-center gap-1 p-6 border bordergray-00 rounded-xl shadow shadow-gray-400 bg-gray-100 my-2"}
				>
					<label className={"w-full flex flex-col font-bold text-gray-600"}>Title
						<input className={"input-primary w-1/2"} onChange={e => { setTitle(e.target.value) }} />
					</label>
					<label className={"flex flex-col font-bold text-gray-600 w-full"}>Body
						<input className={"input-primary"} onChange={e => { setPostBody(e.target.value) }} />
					</label>
					<button className={"btn-primary self-end"} onClick={() => { handleCommentSubmit() }}>Submit</button>
					<div className={"self-start text-red-600"}>{commentError}</div>
				</div>
			</div>

		</>
	)
}
export default CommentForm;

