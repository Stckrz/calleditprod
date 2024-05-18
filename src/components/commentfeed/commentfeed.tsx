import React, { useEffect, useState } from 'react';
import { getCommentsByPredictionId } from "src/library/api/commentfetch"
import { IApiComment } from 'src/models/commentmodels';
import CommentForm from 'components/forms/commentform/commentform';
import Comment from 'components/comment/comment';
import Loading from '../common/loading/loading';

interface commentFeedProps {
	parentId: string,
	commentFeedType: CommentFeedType
}
export enum CommentFeedType {
	PostComment,
	CommentReplies
}

const CommentFeed: React.FC<commentFeedProps> = ({ parentId, commentFeedType }) => {
	const [comments, setComments] = useState<any>();
	const [showCommentForm, setShowCommentForm] = useState(false);
	const [feedPage] = useState(1);
	const [, setCommentCount] = useState(0);
	const [isLoading, setIsLoading] = useState(true);


	async function getComments() {
		const commentObject = await getCommentsByPredictionId({ page: feedPage, id: parentId })
		setComments(commentObject?.comments)
		setCommentCount(commentObject?.count)
		setIsLoading(false)
	}

	useEffect(() => {
		getComments()
	}, [parentId]);

	if (isLoading) {
		return (
			<Loading />
		)
	}
	return (
		<>
			{/* <div className={"w-full flex flex-col gap-2 max-h-96 overflow-auto border p-1"}> */}
			<div className={"w-full flex flex-col gap-2 overflow-auto border p-1"}>
				{commentFeedType === CommentFeedType.PostComment &&
					<div
						className={"cursor-pointer"}
						onClick={() => { setShowCommentForm(!showCommentForm) }}>
						add comment
					</div>
				}
				{showCommentForm &&
					<CommentForm
						parentId={parentId}
						getComments={getComments}
						setShowCommentForm={setShowCommentForm}
					/>
				}
				{comments !== undefined &&
					comments.map((item: IApiComment) => {
						return (
							<Comment key={item._id} commentObject={item} />
						)
					})
				}
			</div>
		</>
	)
}
export default CommentFeed;
