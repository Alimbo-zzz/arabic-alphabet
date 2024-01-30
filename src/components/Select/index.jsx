import React, { useState, useEffect } from 'react';
import cls from './style.module.scss'
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {Icon} from '@/components';

Select.propTypes = {
	"onChange": PropTypes.func,
	"onClick": PropTypes.func,
	"setter": PropTypes.func,
	"className": PropTypes.string,
	"defaultValue": PropTypes.string,
	"width": PropTypes.string,
	"options": PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string,
			label: PropTypes.string
		}).isRequired
	),
}

function Select ({width="200px", onChange=null, setter=null, onClick=null, defaultValue='', className='', options=[], ...props}) {
	const [isOpen, setIsOpen] = useState(false);
	const [activeValue, setActiveValue] = useState({value: '', label: ''});

	useEffect(()=>{setDefaultValue();}, [])
	useEffect(()=>{	
		if(setter) setter(activeValue.value);
	 }, [activeValue])

	const inpOps = {
		readOnly: true,
		onChange: changeInput,
		onClick: clickInput,
	}
	
	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);

	function setDefaultValue(){ 
		let findItem = options.find(el => el.value == defaultValue);
		let base = {value: '', label: ''};
		let result = findItem || base;
		setActiveValue(result);		
	}

	function clickItem(data, index) {
		setActiveValue(data)
		closeModal();
	}

	function clickInput(e) {
		openModal();
		if(onClick)  onClick(e);
	}

	function changeInput(e) {
		if(onChange) onChange(e);
	}
	
	return (<>
		<div style={{width}} className={classNames([cls.select, className])}>
			<input {...props} value={activeValue?.label} className={cls.select__preview} type="text" {...inpOps}  />
			<div data-open={isOpen} className={cls.select__modal}>
				<div data-modal="head" className='container'>
					<button type='button' onClick={closeModal} data-modal="close"><Icon name="cross"/></button>
				</div>
				<ul className={classNames([cls.select__list, 'container'])}>
					{options.map((el, i) => <li onClick={() => clickItem(el, i)} key={i} className={cls.select__item} data-value={el.value}>{el.label}</li>)}
				</ul>
			</div>			
		</div>
	</>);
}

export default Select;