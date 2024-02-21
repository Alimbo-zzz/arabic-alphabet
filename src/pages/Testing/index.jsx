import React, {useEffect, useState} from 'react';
import cls from './style.module.scss';
import {Header, Search, Icon} from '@/components';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';
import { motion, AnimatePresence } from "framer-motion";
import {Animate} from '@/contexts';
import {useActions} from '@/hooks';
import tests from '@data/exams.json';


function List (props) {
	const [searchValue, setSearchValue] = useState('');
	const exams = useSelector(state => state.persons.exam);
	const [filteredExam, setFilteredExam] = useState([]);
	const actions = useActions();

	
	const deleteItem = (el) => {
		let value = confirm(`Вы точно хотите удалить ${el.name}?`);
		if(value) actions.deleteItem({type: 'exam', id: el.id})
	}


	useEffect(()=>{		
		let val = searchValue.trim().toLowerCase();
		const filter = [...exams].map(el => el.name.trim().toLowerCase().search(val) === -1 ? {...el, visible: false} : {...el, visible: true})
		setFilteredExam(filter)
	}, [searchValue, exams])


	const renderItem = (el, i) => (
		<AnimatePresence key={el.id}>
			{
				el.visible &&
				<motion.li 
					className={cls.item}
					initial={{ opacity: 0, x: -100 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -100 }}
				>
					<h4 data-name='title'>{el.name}</h4>
					<h4 data-name='type'>{tests[el.type]}</h4>
					<div className={cls.item__btns}>
						<button onClick={() => deleteItem(el)} className={cls.item__btn}><Icon name='trash'/></button>
						<Link to={`/testing/${el.type}/${el.id}`} className={cls.item__btn}><Icon name='scale'/></Link>
					</div>
				</motion.li>
			}
		</AnimatePresence>
	);


	return (<>
	<Animate>
		<div className={cls.wrap}>
			<div className="container">
				<Header title="Тесты"/>
				<div className={cls.head}>
					<Search setter={setSearchValue} />
					<Link to='/testing/add' className={cls.head__icon}> <Icon name='test-a'/> </Link>
				</div>
			</div>
			<ul className={cls.list}>
				{filteredExam.map(renderItem)}
			</ul>
		</div>
	</Animate>
	</>);
}

export default List;