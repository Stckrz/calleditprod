'use client'
import React, { useState } from 'react';
import { userLogin } from 'src/library/api/userfetch';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Loading from 'src/components/common/loading/loading';

const LoginForm: React.FC = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loginError, setLoginError] = useState("");
	const navigate = useNavigate()
	const [, setCookie] = useCookies(['userInfo']);
	const [isLoading, setIsLoading] = useState(false)

	async function handleLoginSubmit() {
		setIsLoading(true)
		const userData = {
			"username": username,
			"password": password,
		}
		const a = await userLogin(userData)
		if (a.token) {
			setCookie('userInfo', a, { path: '/', maxAge: 1800 })
			navigate('/')
			setIsLoading(false)
		} else {
			setLoginError("incorrect login credentials")
			setIsLoading(false)
		}
	}

	return (
		<>
			<div className={"flex flex-col items-center justify-center gap-1 w-full flex-grow"}>
				<div className={"sm:w-2/4 md:w-1/2 lg:w-1/3 flex flex-col items-start justify-center gap-1 p-6 border border-gray-200 rounded-xl shadow-lg shadow-gray-400 bg-gray-100"}>
					<label className={"w-full flex flex-col font-bold text-gray-600"}>Username
						<input className={"input-primary w-full md:w-auto"} onChange={e => { setUsername(e.target.value) }} />
					</label>
					<label className={"flex flex-col font-bold text-gray-600 w-full"}>Password
						<input type={"password"} className={"input-primary"} onChange={e => { setPassword(e.target.value) }} />
					</label>
					<div className={"flex w-full justify-end gap-2"}>
						{isLoading &&
						<div className={"self-center"}><Loading /></div>
						}
						<button className={"btn-primary self-end"} onClick={() => { handleLoginSubmit() }}>Login</button>
					</div>
					<div className={"self-start text-red-600"}>{loginError}</div>
				</div>
			</div>
		</>
	)
}
export default LoginForm
