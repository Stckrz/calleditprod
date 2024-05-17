import { IApiComment, IComment } from "src/models/commentmodels";
const host = "https://calleditapi.onrender.com"

interface commentParamObject {
	id?: string,
	page?: number
}
export interface commentReturnObject {
	comments: IComment[],
	count: number
}

export async function getCommentsByPredictionId(input: commentParamObject) {
	// let page;
	// if (input.page) {
	// 	page = input.page
	// } else {
	// 	page = 1
	// }
	try {
		const response = await fetch(`${host}/comments/getByPredictionId/${input.id}`);
		const data = await response.json()
		return { comments: data.comments, count: data.total }
	}
	catch (error) { console.log(error) }
}

export async function postNewComment(commentData: IComment, token: string) {
	try {
		const response = await fetch(`${host}/comments/post`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'authorization': `bearer ${token}`
			},
			body: JSON.stringify(commentData)
		})
		const data = await response.json()
		return data
	}
	catch (error) {
		console.log(error)
	}
}

export async function updateComment(commentData: Partial<IApiComment>, token: string, commentId: string) {
	try {
		const response = await fetch(`${host}/comments/update/${commentId}`, {
			method: "PATCH",
			headers: {
				'Content-Type': 'application/json',
				'authorization': `bearer ${token}`
			},
			body: JSON.stringify(commentData)
		})
		const data = await response.json()
		return data
	}
	catch (error) {
		console.log(error)
	}
}
export async function commentReply(commentId: string, token: string, parentCommentId: string) {
	try {
		const response = await fetch(`${host}/comments/addReplyToComment/${parentCommentId}`, {
			method: "PATCH",
			headers: {
				'Content-Type': 'application/json',
				'authorization': `bearer ${token}`
			},
			body: JSON.stringify({ commentId: commentId })
		})
		const data = await response.json()
		return data
	}
	catch (error) {
		console.log(error)
	}
}
// export async function getPredictionsByUsername(input: predictionParamObject) {
// 	let page;
// 	if (input.page) {
// 		page = input.page
// 	} else {
// 		page = 1
// 	}
//
// try {
// 	const response = await fetch(`${host}/predictions/getByUser/${input.username}?page=${page}`)
// 	const data = await response.json()
// 		console.log(data)
// 	return { predictions: data.data, count: data.total }
// }
// catch (error) { console.log(error) }
// }
