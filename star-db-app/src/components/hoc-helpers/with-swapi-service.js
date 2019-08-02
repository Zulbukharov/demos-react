import React from 'react';
import { SwapiServiceConsumer } from '../swapi-service-context';

const withSwapiService = (Wrapped, mapMethodProps) => {
	return (props) => {
		console.log(props);
		return (
			<SwapiServiceConsumer>
				{
					(swapiService) => {
						const serviceProps = mapMethodProps(swapiService);

						return (
							<Wrapped
								{...props}
								{...serviceProps}
							/>
						)
					}
				}
			</SwapiServiceConsumer>
		)

	}
}

export default withSwapiService;