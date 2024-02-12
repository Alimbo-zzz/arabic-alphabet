import React, {useState, useEffect} from 'react';
import {Animate} from '@/contexts';
import {Header, Icon, Search } from "@/components";
import classNames from 'classnames';
import {useSelector} from 'react-redux';
import cls from './style.module.scss';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';


function GroupPerson (props) {
	const groups = useSelector(state => state.persons.group);
	const [searchValue, setSearchValue] = useState('');
	const [filteredGroup, setFilteredGroup] = useState([]);


	useEffect(()=>{
		let val = searchValue.trim().toLowerCase();
		const filter = [...groups].map(el => el.name.trim().toLowerCase().search(val) === -1 ? {...el, visible: false} : {...el, visible: true})
		setFilteredGroup(filter)
	},[searchValue, groups])


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
					<button><Icon name='person-group'/></button>
				</motion.li>
			}
		</AnimatePresence>
	);
	
	return (<>
		<Animate>
			<div className={classNames([cls.wrap])}>
				<div className='container'>
					<Header title="Группы" nav='/persons'/>
					<div className={cls.head}>
						<Search setter={setSearchValue} />
						<Link to='/persons/add-group' className={cls.add_btn}><Icon name='person-group-add'/></Link>
					</div>
					
				</div>

				<ul className={cls.list}>
					{filteredGroup.map(renderItem)}
				</ul>
			</div>
		</Animate>
	</>);
}

export default GroupPerson;