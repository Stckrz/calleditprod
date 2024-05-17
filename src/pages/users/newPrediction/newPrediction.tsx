import React from 'react';
import PredictionForm from 'components/forms/predictionform/predictionform';
import Layout from 'src/pages/layout/layout';


const NewPrediction: React.FC = () => {
	return (
		<>
			<Layout>
				<PredictionForm />
			</Layout>
		</>
	)
}

export default NewPrediction;
