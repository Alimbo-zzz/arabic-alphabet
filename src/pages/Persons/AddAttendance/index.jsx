import React, {useState, useEffect} from 'react';
import {Animate} from '@/contexts';
import {Icon} from '@/components';
import {Link, useNavigate} from 'react-router-dom';
import classNames from 'classnames';
import cls from './style.module.scss';
import {useActions} from '@/hooks';


function AddAttendance (props) {
	const navigate = useNavigate();
	const {addAttendance} = useActions();
	const [attendanceName, setAttendanceName] = useState('');
	const [isValid, setIsValid] = useState(false);



	useEffect(()=>{
		let valid = true;
		let name = attendanceName.trim().length;
		if(name < 2) valid = false;
		setIsValid(valid);
	}, [attendanceName])


	const inpNameOps = {
		type:"text", 
		required: true, 
		placeholder:'Введите название урока',
		name:"attendance",
		autoComplete:'off',
		onChange: e => setAttendanceName(e.target.value),
		value: attendanceName,
	}

	const back = () => navigate(-1);


	function send(e){
		e.preventDefault();
		addAttendance(attendanceName);
		back();
	}
	
	return (<>
		<Animate>
			<div className={classNames([cls.wrap, 'container'])}>
				<div className={cls.head}>
					<h2>Создание урока</h2>
					<button className={cls.cross} onClick={back}><Icon name="cross"/></button>
				</div>
				<form autoComplete='off' onSubmit={send} className={cls.form}>
					<input className={cls.form__inp} {...inpNameOps} />
					<button disabled={!isValid} type='submit' className={cls.form__btn}>Создать</button>
				</form>
			</div>
		</Animate>
	</>);
}

export default AddAttendance;