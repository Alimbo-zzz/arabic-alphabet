import React, {useState, useEffect} from 'react';
import {Header} from '@/components';
import {ReactSelect} from '@/components/Select';
import cls from './style.module.scss';
import {useSelector} from 'react-redux';



function Exam (props) {
	const {group, list} = useSelector(state =>  state.persons);
	const [groupSelect, setGroupSelect] = useState('');

	const groupSelectOps = [
		{value: "none", label: "Без группы"},
		...[...group].map(el => ({label: el.name, value: el.id}))
	];
	
	return (<>
		<div className={cls.wrap}>
			<div className='container'>
				<div className={cls.head}>
					<Header title="Экзамен"/>
					<ReactSelect value={groupSelect} setter={setGroupSelect}  options={groupSelectOps}/>
				</div>
			</div>
		</div>
	</>);
}

export default Exam;