import React, {useState, useEffect} from 'react';
import {Animate} from '@/contexts';
import {Header, Icon, Search } from "@/components";
import classNames from 'classnames';
import {useSelector} from 'react-redux';
import cls from './style.module.scss';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';

function Attendance (props) {
	const attendance = useSelector(state => state.persons.attendance);
	const [searchValue, setSearchValue] = useState('');
	const [filteredAttendance, setFilteredAttendance] = useState([]);



	useEffect(()=>{
		let val = searchValue.trim().toLowerCase();
		const filter = [...attendance].map(el => el.name.trim().toLowerCase().search(val) === -1 ? {...el, visible: false} : {...el, visible: true})
		setFilteredAttendance(filter)
	},[searchValue, attendance])


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
					<Link to={'/persons/info-attendance/' + el.id} className={cls.item__btn}><Icon name='scale'/></Link>
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
						<Link to='/persons/add-attendance' className={cls.add_btn}> <Icon name='books' /> </Link>
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