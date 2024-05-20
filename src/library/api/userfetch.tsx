import { IRegister, IUser } from "src/models/usermodels"
import { ILogin } from "src/models/usermodels"
const host = "https://calleditapi.onrender.com"

//gets all users
export async function getAllUsers() {
	try {
		const response = await fetch(`${host}/users/getAll`)
		const data = await response.json()
		return (data)
	}
	catch (error) { console.log(error) }
}

export async function deleteUserById(id: string, token: string) {
	try {
		const response = await fetch(`${host}/users/deleteOne/${id}`, {
			method: "DELETE",
			headers: {
				'Content-Type': 'application/json',
				'authorization': `bearer ${token}`
			},
		})
		const data = await response.json()
		return data
	}
	catch (error) { console.log(error) }
}


//registers a new user
export async function registerUser(sendData: IRegister) {
	try {
		const response = await fetch(`${host}/users/register`, {
			headers: { "Content-Type": "application/json" },
			method: 'POST',
			body: JSON.stringify(sendData)
		})
		const data = await response.json()
		console.log(data)
		return (data)

	} catch (error) { console.log(error) }

}

//User login
export async function userLogin(login: ILogin) {
	try {
		const response = await fetch(`${host}/users/login`, {
			headers: { "Content-Type": "application/json" },
			method: 'POST',
			body: JSON.stringify(login)
		})
		const data = await response.json()
		console.log(data)
		return (data)

	} catch (error) { console.log(error) }

}

//updates a user
export async function userUpdate(id: string, updatedData: Partial<IUser>) {
	try {
		const response = await fetch(`${host}/users/update/${id}`, {
			headers: { "Content-Type": "application/json" },
			method: 'PATCH',
			body: JSON.stringify(updatedData)
		})
		const data = await response.json()
		console.log(data)
		return (data)
	}
	catch (error) { console.log(error) }
}

//increments a users score by 1
export async function userScoreIncrement(id: string) {
	try {
		const response = await fetch(`${host}/users/incrementScore/${id}`, {
			headers: { "Content-Type": "application/json" },
			method: 'PATCH',
		})
		const data = await response.json()
		console.log(data)
		return (data)
	}
	catch (error) { console.log(error) }
}

//fetches a single user by username
export async function getUserByUsername(username: string) {
	try {
		const response = await fetch(`${host}/users/find/${username}`)
		const data = await response.json()
		return data
	}
	catch (error) { console.log(error) }
}

