import React from 'react';
import RegisterForm from 'components/forms/registerform/registerform';
import Layout from 'src/pages/layout/layout';


const Login: React.FC = () => {
	return (
		<>
			<Layout>
				<RegisterForm />
			</Layout>
		</>
	)
}

export default Login
