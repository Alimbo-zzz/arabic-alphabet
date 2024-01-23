import React from 'react';
import sprite from './sprite.svg';

function Icon ({name}) {
	
	return (<>
		<svg>
			<use 
				xlinkHref={`${sprite}#${name}`} 
				href={`${sprite}#${name}`} 
			/>
		</svg>
	</>);
}

export default Icon;