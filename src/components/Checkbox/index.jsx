import React from 'react';
import cls from './style.module.scss'
import classNames from 'classnames';
import sprite from './sprite.svg';


function Checkbox ({className='', ...props}) {
	
	return (<>
		<label className={classNames([cls.checkbox, className])}>
			<input className={cls.checkbox__inp} type="checkbox" {...props}/>
			<div className={cls.checkbox__style} >
				<svg className={cls.checkbox__tick}>
					<use 
						xlinkHref={`${sprite}#${'tick-bold'}`} 
						href={`${sprite}#${'tick-bold'}`} 
					/>
				</svg>
			</div>
		</label>
	</>);
}

export default Checkbox;