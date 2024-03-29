import React, { useState, useEffect } from 'react';
import cls from './style.module.scss'
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {Icon} from '@/components';
import { motion, AnimatePresence } from "framer-motion";
import {useDebounce} from '@/hooks';

Select.propTypes = {
	"onChange": PropTypes.func,
	"onClick": PropTypes.func,
	"setter": PropTypes.func,
	"className": PropTypes.string,
	"defaultValue": PropTypes.string,
	"search": PropTypes.bool,
	"visible": PropTypes.bool,
	"width": PropTypes.string,
	"placeholder": PropTypes.string,
	"options": PropTypes.arrayOf(
		PropTypes.shape({
			value: PropTypes.string,
			label: PropTypes.string,
			mark: PropTypes.bool,
		}).isRequired
	),
}

function Select ({width="200px", onChange=null, visible=true, search=false, setter=null, reactValue=null, onClick=null, defaultValue='', className='', options=[], placeholder='',  ...props}) {
	const [isOpen, setIsOpen] = useState(false);
	const [activeValue, setActiveValue] = useState({value: '', label: ''});
	const [searchValue, setSearchValue] = useState('');
	const [filteredData, setFilteredData] = useState([...options]);
	const debouncedSearchValue = useDebounce(searchValue, 300);

	useEffect(()=>{	setFilteredData([...options].map(el => ({...el, visible: true})))	}, [options])
	useEffect(()=>{setDefaultValue();}, [])
	useEffect(()=>{	
		if(setter) setter(activeValue.value);
	 }, [activeValue])

	 useEffect(()=>{
		let val = searchValue.trim().toLowerCase();
		const filter = [...options].map(el => el.label.trim().toLowerCase().search(val) === -1 ? {...el, visible: false} : {...el, visible: true})
		setFilteredData(filter)
	 }, [debouncedSearchValue])

	const inpOps = {
		readOnly: true,
		onChange: changeInput,
		onClick: clickInput,
	}
	
	const resetSearch = () => setSearchValue('');
	const openModal = () => setIsOpen(true);
	const closeModal = () => {setIsOpen(false); setSearchValue('');}
	const dataLength = () => filteredData.find(el => el.visible === true);

	function setDefaultValue(){ 
		let findItem = options.find(el => el.value == defaultValue);
		let base = {value: '', label: ''};
		let result = findItem || (placeholder && base) || options[0] || base;
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



	const SelectItemRender = (el, i) => (
		<AnimatePresence key={i}>
			{
				el.visible &&
				<motion.li 
					onClick={() => clickItem(el, i)}
					className={cls.select__item} 
					initial={{ opacity: 0, x: -100 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -100 }}
					data-selected={el.value === activeValue.value}
				>
					<h4 style={{textAlign: typeof el?.mark === 'boolean' ? 'left' : 'center'}}>{el.label}</h4>
					{el?.mark && <span/>}
				</motion.li>
			}
		</AnimatePresence>
	);

	
	return (<>
		<div style={{width, position: visible ? 'relative' : 'absolute'}} className={classNames([cls.select, className])}>
			<input style={{display: visible ? 'block' : 'none'}} {...props} placeholder={placeholder} value={activeValue?.label} className={cls.select__preview} type="text" {...inpOps}  />
			<div data-open={isOpen} className={cls.select__modal}>
				<div data-modal="head" className='container'>
					<button type='button' onClick={closeModal} data-modal="close"><Icon name="cross"/></button>
				</div>
				{search && 
					<div className={classNames([cls.select__search, 'container'])}> 
						<input type="text" placeholder='Поиск' value={searchValue} onChange={e => setSearchValue(e.target.value)} /> 
						<button type='button' onClick={resetSearch} disabled={searchValue.length === 0}><Icon name="cross"/></button>
					</div>
				}
				{
					dataLength() ? 					
					<ul className={classNames([cls.select__list, 'container'])}>
						{filteredData.map(SelectItemRender)}
					</ul>	
					:
					<h3>Нет результатов</h3>
				}
			</div>			
		</div>
	</>);
}

export default Select;



import ReactSelect from './ReactSelect';

export {
	ReactSelect
}