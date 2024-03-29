import React from 'react';
import cls from './style.module.scss'
import classNames from 'classnames';
import sprite from './sprite.svg';
import tick from './tick-bold.svg';


function Checkbox ({size=16, className='', color="#666", type='circle', theme='', ...props}) {
	
	return (<>
		<label data-theme={theme} style={{fontSize: size, color}} data-type={type} className={classNames([cls.checkbox, className])}>
			<input className={cls.checkbox__inp} type="checkbox" {...props}/>
			<div className={cls.checkbox__style} >
				<div data-name='element'/>
				{/* <svg>
					<use 
						xlinkHref={`${sprite}#tick`} 
						href={`${sprite}#tick`} 
					/>
				</svg> */}
				<img src={tick} />
			</div>
		</label>
	</>);
}

export default Checkbox;