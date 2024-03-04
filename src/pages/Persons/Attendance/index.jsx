import React, {useState, useEffect} from 'react';
import {Animate} from '@/contexts';
import {Header, Icon, Search, Checkbox } from "@/components";
import classNames from 'classnames';
import {useSelector} from 'react-redux';
import cls from './style.module.scss';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';
import {useActions} from '@/hooks';
import {unixData} from './h_date.js';


function Attendance (props) {
	const attendance = useSelector(state => state.persons.attendance);
	const {isAdmin} = useSelector(state => state.admin);
	const [searchValue, setSearchValue] = useState('');
	const [filteredAttendance, setFilteredAttendance] = useState([]);
	const actions = useActions();

	useEffect(()=>{
		let val = searchValue.trim().toLowerCase();
		const filter = [...attendance].map(el => el.name.trim().toLowerCase().search(val) === -1 ? {...el, visible: false} : {...el, visible: true})
		setFilteredAttendance(filter)
	},[searchValue, attendance])

	const deleteItem = (el) => {
		let value = confirm(`Вы точно хотите удалить ${el.name}?`);
		if(value) actions.deleteItem({type: 'attendance', id: el.id})
	}


	const getDate = (date) => unixData(date).made.ru.contextDateMonthYear;

	const changeCheckbox = (e, id) => {
		let value = e.target.checked;
		actions.changeAttendanceGraph({graph: value, id});
	} 


	const renderItem = el => (
		<AnimatePresence key={el.id}>
			{
				el.visible &&
				<motion.li 
					className={cls.item}
					initial={{ opacity: 0, x: -100 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -100 }}
				>
					<h4>{el.name}</h4>
 					<div className={cls.item__btns}>
						<button style={{display: isAdmin ? "flex" : "none"}} onClick={() => deleteItem(el)} className={cls.item__btn}><Icon name='trash'/></button>
						<Link to={'/persons/info-attendance/' + el.id} className={cls.item__btn}><Icon name='scale'/></Link>
					</div>
					
					<div className={cls.item__info}>
						<label style={{pointerEvents: isAdmin ? 'auto' : 'none'}}> <span>Мусхаф</span> <Checkbox size={10} type='slider' onChange={e => changeCheckbox(e, el.id)} defaultChecked={el.graph}/></label>
						<p>{getDate(el.date)}</p>
					</div>
				</motion.li>
			}
		</AnimatePresence>
	);

	
	return (<>
		<Animate>
			<div className={classNames([cls.wrap])}>
				<div className='container'>
					<Header title="Посещаемость" nav='/persons'/>
					<div className={cls.head}>
						<Search setter={setSearchValue} />
						<Link style={{display: isAdmin ? "flex" : "none"}} to='/persons/add-attendance' className={cls.add_btn}> <Icon name='books' /> </Link>
					</div>
				</div>

				<ul className={cls.list}>
					{filteredAttendance.map(renderItem)}
				</ul>
			</div>
		</Animate>
	</>);
}

export default Attendance;