import React, {useState, useEffect, useRef} from 'react';
import cls from './lesson.module.scss';
import {Header, Checkbox, Icon} from '@/components';
import {ReactSelect} from '@/components/Select';
import {useParams} from 'react-router-dom';
import {useSelector} from 'react-redux';
import { motion, AnimatePresence } from "framer-motion";
import {useActions} from '@/hooks';
import { gradeVariants} from '@data/personData.json';


const renderItem = ({el, click, isAdmin}) => {

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
				<div onClick={(e) => click(e, el)} className={cls.item__btns} style={{pointerEvents: isAdmin ? 'auto' : 'none'}}>
					<Checkbox readOnly checked={el.isRead} type='square' />
					<div className={cls.item__star}>
						<Icon name="star"/>
						<span>{el?.grade}</span>
					</div>
				</div>
			</motion.li>
		}
	</AnimatePresence>
}
	


function Lesson (props) {
	const params = useParams();
	const attendence = useSelector(state => state.persons.attendance);
	const persons = useSelector(state => state.persons.list);
	const groups = useSelector(state => state.persons.group);
	const {isAdmin} = useSelector(state => state.admin);
	const [title, setTitle] = useState('');
	const [data, setData] = useState([]);
	const [filterGroup, setFilterGroup] = useState('');
	const {changeAttendancePerson} = useActions();
	const formActions = useRef(null);
	const [formActionsOpen, setFormActionsOpen] = useState(false);
	const [actionsData, setActionsData] = useState({grade: null, attendance: null, id: null})
	const [groupISisLoad, setgroupISisLoad] = useState(false);

 
	const selectOps = [
		{value: 'all', label: 'Все группы'},
		...groups.map(el => ({value: el.id, label: el.name}))
	]


	useEffect(()=>{
		document.addEventListener('click', closeFormActions);
		return (e) => {
			document.removeEventListener('click', closeFormActions);
		}
	}, [])

	useEffect(()=>{
		const obj = attendence.find(el => el.id === params.id);
		if(!obj) return;
		setTitle(obj.name);
	}, [params])

	useEffect( dataSetter, [persons, attendence, filterGroup])

	useEffect(()=>{
		let key = 'arabic-attendance-group-selected';
		if(groupISisLoad) window.localStorage.setItem(key, filterGroup);
		else{
			setgroupISisLoad(true);
			setFilterGroup(window.localStorage.getItem(key))
		}
	}, [filterGroup, groupISisLoad])
	

	function dataSetter() {
		let indexArr = [...attendence]?.filter(el => el.graph)?.map(el => el.id);
		let prevLessonIndex = indexArr.indexOf(params.id) + 1;
		let attendanceArr = [...attendence].find(el => el.id === params.id)?.data?.filter(el => el.status === 'attend')?.map(el => {
			let prevLesson = [...attendence]?.find(el => el.id === indexArr[prevLessonIndex])?.data?.find(item => item.personId === el.personId);
			let isRead = prevLesson?.grade ? true : false;
			return ({...el, isRead})
		});
		let sortArr = attendanceArr?.sort(el => el.isRead ? 1 : -1);
		let personsArr = [];

		sortArr?.forEach(el => {
			let findPerson = [...persons].find(person => person.id == el.personId);
			if(!findPerson) return;
			personsArr.push({...findPerson, ...el, visible: true})
		})

		let findGroup = groups.find(el => el.id === filterGroup);
		let filtered = personsArr.filter(el => el.group === findGroup?.id);
		let result = findGroup ? filtered : personsArr;
		setData(result);
	}

	
	function closeFormActions() {setFormActionsOpen(false)}

	const sendActions = (e) => {
	  e.preventDefault();
		let result = {
			personId: actionsData?.id, 
			id: params.id,
			grade: actionsData?.grade,
			status: actionsData?.attendance, 
		}

		changeAttendancePerson(result)
	}

	const clickActions = (e, el) => {
		e.stopPropagation();
		if(!isAdmin) return;
		setFormActionsOpen(true);
		let obj = {id: el.id, grade: el?.grade || null, attendance: el?.status || null};
		setActionsData(obj)
	} 


	const renderGrade = (el, i) => {
		let ops = {
			value: el, 
			checked: actionsData?.grade == el,
			onChange: (e) => setActionsData(prev => ({...prev, grade: e.target.value}))
		}

		return (
			<label key={i} className={cls.radioGrade}>
				<input type="radio" name="grade" {...ops} />
				<div className={cls.radioGrade__style}>
					<Icon name="star"/>
					<span>{el}</span>
				</div>				
			</label>
		)
	}


	const getPersonName = () => [...persons]?.find(el => el.id === actionsData?.id)?.name;


	return (<>
		<div className={cls.wrap}>
			<div className="container">
				<div className={cls.head}>
					<Header title={title} nav={-1}/>
					<ReactSelect value={filterGroup} setter={setFilterGroup} options={selectOps}/>
				</div>
			</div>
			<ul className={cls.list}>
				{data.map((el) => renderItem({el, isAdmin, click: clickActions}))}
			</ul>
		</div>

		<form className={cls.actions} ref={formActions} onClick={e => e.stopPropagation()} onReset={closeFormActions} onSubmit={sendActions} data-open={formActionsOpen} >
			<div className="container">
				<div className={cls.actions__wrap}>
					<h4 className={cls.actions__title}>{getPersonName()}</h4>				
					<div className={cls.actions__grade}>
						{gradeVariants.map(renderGrade)}
					</div>								
					<button className={cls.actions__btn} type="submit" onClick={closeFormActions}>Готово</button>
				</div>
			</div>
		</form>
	</>);
}

export default Lesson;