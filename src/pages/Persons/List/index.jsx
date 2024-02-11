import React, {useState, useEffect} from 'react';
import {Animate} from '@/contexts';
import {Header, Icon, Search } from "@/components";
import classNames from 'classnames';
import {useSelector} from 'react-redux';
import cls from './style.module.scss';
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';


function List (props) {
	const persons = useSelector(state => state.persons.list);
	const [searchValue, setSearchValue] = useState('');
	const [filteredPerson, setFilteredPerson] = useState([]);



	useEffect(()=>{
		let val = searchValue.trim().toLowerCase();
		const filter = [...persons].map(el => el.name.trim().toLowerCase().search(val) === -1 ? {...el, visible: false} : {...el, visible: true})
		setFilteredPerson(filter)
	},[searchValue])


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
					<button><Icon name='search-person'/></button>
				</motion.li>
			}
		</AnimatePresence>
	);

	
	return (<>
		<Animate>
			<div className={classNames([cls.wrap])}>
				<div className='container'>
					<Header title="Список людей" nav='/persons'/>
					<div className={cls.head}>
						<Search setter={setSearchValue} />
						<Link to='/persons/add-person' className={cls.add_btn}> <Icon name='person-add' /> </Link>
					</div>
				</div>

				<ul className={cls.list}>
					{filteredPerson.map(renderItem)}
				</ul>
			</div>
		</Animate>
	</>);
}

export default List;