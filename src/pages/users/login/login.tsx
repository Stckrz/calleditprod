import React from 'react';
import LoginForm from 'components/forms/loginform/loginform';
import Layout from 'src/pages/layout/layout';


const Login: React.FC = () => {
	return (
		<>
			<Layout>
				<LoginForm />
			</Layout>
		</>
	)
}

export default Login
