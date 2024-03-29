import React, {useState, useEffect} from 'react';
import {Animate} from '@/contexts';
import {Header, Icon, Search } from "@/components";
import classNames from 'classnames';
import {useSelector} from 'react-redux';
import cls from './style.module.scss';
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';




const GraphGroup = (props) => {
	const { list, attendance} = useSelector(state => state.persons);
	const [searchValue, setSearchValue] = useState('');
	const [filteredPerson, setFilteredPerson] = useState([]);
	const navigate = useNavigate();




	useEffect(()=>{
		let val = searchValue.trim().toLowerCase();
		const filter = [...list].map(el => el.name.trim().toLowerCase().search(val) === -1 ? {...el, visible: false} : {...el, visible: true})
		setFilteredPerson(filter)
	},[searchValue, list])


	const getQuantityGrade = (item) => {
		let arr = [...attendance].filter(lesson => lesson.data.find(el => el.personId === item.id && lesson.graph === true && el?.grade) ? true : false);
		return arr.length;
	} 

	const getAverage = (item) => {
		let arr = [...attendance].filter(lesson => lesson.data.find(el => el.personId === item.id && lesson.graph === true && el?.grade) ? true : false);
		let numbers = arr.map(lesson => lesson.data.find(el => el.personId === item.id && el.grade)?.grade);
		let result = Math.round(numbers.reduce((acc, number) => acc + number, 0) / numbers.length) || "";
		return result;
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
					onClick={() => navigate('/persons/info-person/' + el.id)}
				>
					<h4>{el.name}</h4>
					<div className={cls.item__info}>
						<div data-name='star'>
							<Icon name="star"/>
							<span>{getAverage(el)}</span>
						</div>
						<div data-name="grid">
							<Icon name="grid"/>
							<span>{getQuantityGrade(el)}</span>
						</div>
					</div>
				</motion.li>
			}
		</AnimatePresence>
	);

	

 	
	return (<>
		<Animate>
			<div className={classNames([cls.wrap])}>
				<div className='container'>
					<Header title={"Средние баллы"} size={22} nav={-1} />
					<div className={cls.filter}>
						<Search setter={setSearchValue} />
						<div className={cls.filter__select}>
							{/* <ReactSelect options={[]}/> */}
						</div>
					</div>
				</div>

				<ul className={cls.list}>
					{filteredPerson.map(renderItem)}
				</ul>
			</div>
		</Animate>
	</>);
}

export default GraphGroup;

