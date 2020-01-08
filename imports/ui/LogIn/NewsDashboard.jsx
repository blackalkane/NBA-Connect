import React from 'react';
import LoremIpsum from '../LoremIpsum';
import News from './News';

class NewsDashboard extends React.Component {
	render() {
		return (
			<div>
				<div className="top">
					<div className="News">
						<News />
					</div>
				</div>
			</div>
);
	}
}

export default NewsDashboard;
