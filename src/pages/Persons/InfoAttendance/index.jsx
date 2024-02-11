import React, {useState, useEffect} from 'react';
import cls from './style.module.scss';
import {Header, Select, Radio} from '@/components';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { motion, AnimatePresence } from "framer-motion";
import {useActions} from '@/hooks';


const renderItem = (el, setter, id) => {
	const radioList = [
		{	value:"absent", icon:"minus", color:"#C92E23" },
		{	value:"reason", icon:"reason", color:"#DCAF29" },
		{	value:"attend", icon:"tick", color:"#33C92F" },
	]

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
				<div className={cls.item__radio}>
					{radioList.map((radio, idx) => <Radio 
						key={idx}
						defaultChecked={el.status === radio.value} 
						width="100%"
						icon={radio.icon}
						color={radio.color} 
						name={el.id}
						onChange={e => setter({id, personId: el.id, status: radio.value})}
					/>)}
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
	const [title, setTitle] = useState('');
	const [data, setData] = useState([]);
	const [selectData, setSelectData] = useState('');
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
		let groupArr = groups.find(el => el.id === selectData);
		let filtered = arr.filter(el => groupArr?.persons.includes(el.id))
		let result = groupArr ? filtered : arr;
		setData(result);
	}, [persons, selectData])



	return (<>
		<div className={cls.wrap}>
			<div className="container">
				<div className={cls.head}>
					<Header title={title} nav={-1}/>
					<Select setter={setSelectData} options={selectOps}/>
				</div>
			</div>
			<ul className={cls.list}>
				{data.map((el) => renderItem(el, changeAttendancePerson, params.id))}
			</ul>
		</div>
	</>);
}

export default InfoAttendance;