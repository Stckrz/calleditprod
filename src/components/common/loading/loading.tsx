import style from './loadingAnimations.module.css';

const Loading: React.FC = () => {
	return (
		<>
			<div className={"flex gap-0"}>
				<div className={`${style.dot} ${style.dot1} text-cyan-500 m-0`}>.</div>
				<div className={`${style.dot} ${style.dot2} text-cyan-500 m-0`}>.</div>
				<div className={`${style.dot} ${style.dot3} text-cyan-500 m-0`}>.</div>
			</div >
		</>
	)
}
export default Loading;
