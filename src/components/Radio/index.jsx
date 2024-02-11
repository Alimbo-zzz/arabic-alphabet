import React, {useEffect, useState} from 'react';
import cls from './style.module.scss'
import classNames from 'classnames';
import sprite from './sprite.svg';


function Radio ({className='', color="#5753DC", iconColor='#fff', width='30px', icon=null, ...props}) {


	return (<>
		<label style={{width}} className={classNames([cls.radio, className])}>
			<input className={cls.radio__inp} type="radio" {...props}/>
			<div className={cls.radio__style} >
				<svg fill={iconColor}>	<use xlinkHref={`${sprite}#${icon}`}/> </svg>
				<div style={{background: `linear-gradient(to top, ${color}, color-mix(in srgb, ${color} 70%, white) )`}} data-name='bg' />
			</div>
		</label>
	</>);
}

export default Radio;