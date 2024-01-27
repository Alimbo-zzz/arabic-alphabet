import React, { useState, useEffect } from 'react';
import cls from './style.module.scss'
import classNames from 'classnames';

function Select ({onChange=null, onClick=null, className='', options=[], ...props}) {
	const [isOpen, setIsOpen] = useState(false);

	const inpOps = {
		readOnly: true,
		onChange: changeInput,
		onClick: clickInput,
	}

	function clickInput(e) {
		console.log('click');
		if(typeof onClick === 'function') onClick(e);
	}

	function changeInput(e) {
		console.log('change');
		if(typeof onChange === 'function') onChange(e);
	}
	
	return (<>
		<div className={classNames([cls.select, className])}>
			<input {...props} className={cls.select__preview} type="text" {...inpOps}  />
			
		</div>
	</>);
}

export default Select;