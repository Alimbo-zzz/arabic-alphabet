import React, {useState, useEffect} from 'react';
import cls from './info.module.scss';
import {Header, Radio, Icon} from '@/components';
import {ReactSelect} from '@/components/Select';
import {useParams, Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { motion, AnimatePresence } from "framer-motion";
import {useActions} from '@/hooks';
import {attendanceData as radioList} from '@data/personData.json';


const renderItem = (el, setter, id, isAdmin) => {

	return <AnimatePresence key={el.id}>
		{
			el.visible &&
			<motion.li 
				className={cls.item}
				initial={{ opacity: 0, x: -100 }}
				animate={{ opacity: 1, x: 0 }}
				exit={{ opacity: 0, x: -100 }}
			>
				<h4 className={cls.item__person}>{el.name}</h4>
				<div className={cls.item__radio} style={{pointerEvents: isAdmin ? 'auto' : 'none'}}>
					{radioList.map((radio, idx) => (
						<Radio 
							key={idx}
							defaultChecked={el.status === radio.value} 
							width="100%"
							icon={radio.icon}
							color={"#888"} 
							name={el.id}
							onChange={e => setter({id, personId: el.id, status: radio.value})}
						/>
					))}
				</div>
			</motion.li>
		}
	</AnimatePresence>
}
	


function InfoAttendance (props) {
	const params = useParams();
	const attendence = useSelector(state => state.persons.attendance);
	const persons = useSelector(state => state.persons.list);
	const groups = useSelector(state => state.persons.group);
	const {isAdmin} = useSelector(state => state.admin);
	const [title, setTitle] = useState('');
	const [data, setData] = useState([]);
	const [filterGroup, setFilterGroup] = useState(window.localStorage.getItem('arabic-attendance-group-selected') || '');
	const {changeAttendancePerson} = useActions();
	
 
	const selectOps = [
		{value: 'all', label: 'Все группы'},
		...groups.map(el => ({value: el.id, label: el.name}))
	]

	useEffect(()=>{
		const obj = attendence.find(el => el.id === params.id);
		if(!obj) return;
		setTitle(obj.name);
	}, [params])

	useEffect(()=>{
		let arr = [...persons].map(person => {			
			let status = attendence.find(el => el.id === params.id).data?.find(el => el?.personId === person?.id)?.status;
			return ({...person, status, visible: true});
		});
		let groupArr = groups.find(el => el.id === filterGroup);
		let filtered = arr.filter(el => groupArr?.data.includes(el.id))
		let result = groupArr ? filtered : arr;
		setData(result);
	}, [persons, filterGroup])

	useEffect(()=>{
		window.localStorage.setItem('arabic-attendance-group-selected', filterGroup)
	}, [filterGroup])

	


	return (<>
		<div className={cls.wrap}>
			<div className="container">
				<div className={cls.head}>
					<Header title={title} nav={-1}/>
					<div className={cls.head__box}>
						<ReactSelect value={filterGroup} setter={setFilterGroup} options={selectOps}/>
						<Link to={'/survey/' + params.id}> <Icon name="test"/> </Link>
					</div>
				</div>
			</div>
			<ul className={cls.list}>
				{data.map((el) => renderItem(el, changeAttendancePerson, params.id, isAdmin))}
			</ul>
		</div>
	</>);
}

export default InfoAttendance;