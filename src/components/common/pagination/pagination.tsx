import { SetStateAction, useEffect, useState } from "react"

interface PaginationProps {
	setPage: React.Dispatch<SetStateAction<number>>,
	page: number,
	entryCount: number,
	entryLimit: number
}
const Pagination: React.FC<PaginationProps> = ({ setPage, page, entryCount, entryLimit }) => {
	const [pages, setPages] = useState(0)

	useEffect(() => {
		setPages(Math.floor(entryCount / entryLimit) + 1)
	}, [entryCount])

	return (
		<>
			<div className={"flex items-center justify-end h-full"}>
				<div className={"flex items-center justify-center bg-gray-100 rounded select-none"}>
					<div
						className={"flex items-center justify-center m-0.5 rounded bg-cyan-500 px-1 cursor-pointer hover:bg-cyan-700"}
						onClick={() => { page > 1 && setPage(page - 1) }}
					>
						{"<"}
					</div>
					{page > 1 &&
						<div
							className={"flex items-center justify-center h-1/2 m-0.5 rounded bg-cyan-500 px-2 cursor-pointer hover:bg-cyan-700"}
							onClick={() => { setPage(page - 1) }}>
							{page - 1}
						</div>
					}
					<div
						className={"flex items-center justify-center h-1/2 m-0.5 rounded bg-cyan-500 px-2 cursor-pointer hover:bg-cyan-700"}
						onClick={() => { setPage(page) }}>
						{page}
					</div>
					{page < pages &&
						<div
							className={"flex items-center justify-center h-1/2 m-0.5 rounded bg-cyan-500 px-2 cursor-pointer hover:bg-cyan-700"}
							onClick={() => { setPage(page + 1) }}>
							{page + 1}
						</div>
					}
					{/* { */}
					{/* 	 */}
					{/* 	pageArray.map((page) => { */}
					{/* 		return ( */}
					{/* 			<div */}
					{/* 				key={page} */}
					{/* 				className={"flex items-center justify-center h-1/2 m-0.5 rounded bg-cyan-500 px-2 cursor-pointer hover:bg-cyan-700"} */}
					{/* 				onClick={() => { setPage(page) }}> */}
					{/* 				{page} */}
					{/* 			</div> */}
					{/* 		) */}
					{/* 	}) */}
					{/* } */}
					<div
						className={"flex items-center justify-center h-1/2 m-0.5 rounded bg-cyan-500 px-1 cursor-pointer hover:bg-cyan-700"}
						onClick={() => { page < pages && setPage(page + 1) }}
					>
						{">"}
					</div>
				</div>
			</div>
		</>
	)
}

export default Pagination;
