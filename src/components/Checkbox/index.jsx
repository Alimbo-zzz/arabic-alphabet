import React from 'react';
import cls from './style.module.scss'
import classNames from 'classnames';
// import sprite from './sprite.svg';
import tick from './tick-bold.svg';


function Checkbox ({className='', type='circle', ...props}) {
	
	return (<>
		<label data-type={type} className={classNames([cls.checkbox, className])}>
			<input className={cls.checkbox__inp} type="checkbox" {...props}/>
			<div className={cls.checkbox__style} >
				<img src={tick} className={cls.checkbox__tick}/>
			</div>
		</label>
	</>);
}

export default Checkbox;