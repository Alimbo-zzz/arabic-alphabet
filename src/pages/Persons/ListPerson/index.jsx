import React, {useState, useEffect} from 'react';
import {Animate} from '@/contexts';
import {Header, Icon, Search } from "@/components";
import classNames from 'classnames';
import {useSelector} from 'react-redux';
import cls from './style.module.scss';
import { motion, AnimatePresence } from "framer-motion";
import { Link, useParams } from 'react-router-dom';
import {useActions} from '@/hooks';


function List ({type='base'}) {
	const {groupId} = useParams();
	const persons = useSelector(state => state.persons.list);
	const groups = useSelector(state => state.persons.group);
	const [searchValue, setSearchValue] = useState('');
	const [filteredPerson, setFilteredPerson] = useState([]);
	const [isGroupType, setisGroupType] = useState(false);
	const actions = useActions();


	const groupName = groups.find(el => el.id === groupId)?.name;


	useEffect(()=>{
		if(groupId && type === 'group') setisGroupType(true);
		else setisGroupType(false);
	}, [type])


	useEffect(()=>{
		let val = searchValue.trim().toLowerCase();
		let arr = [...persons];
		if(groupId && type === 'group') {
			arr = [...persons].filter(el => el.group === groupId);
		}
		const filter = arr.map(el => el.name.trim().toLowerCase().search(val) === -1 ? {...el, visible: false} : {...el, visible: true})
		setFilteredPerson(filter)
	},[searchValue, persons])


	const deleteItem = (el) => {
		if(isGroupType){
			let value = confirm(`Вы точно хотите убрать из группы ${el.name}?`);
			value && actions.updateGroupToPerson({groupId: null, personId: el.id})
		}else{
			let value = confirm(`Вы точно хотите удалить персону ${el.name}?`);
			value && actions.deleteItem({type: 'list', id: el.id})
		}
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
						<button className={cls.item__btn} onClick={() => deleteItem(el)}><Icon name='trash'/></button>
						<Link to={"/persons/info-person/" + el.id} className={cls.item__btn} ><Icon name='search-person'/></Link>
					</div>
				</motion.li>
			}
		</AnimatePresence>
	);

	
	return (<>
		<Animate>
			<div className={classNames([cls.wrap])}>
				<div className='container'>
					<Header title={isGroupType ? groupName : "Список людей"} nav={-1}/>
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