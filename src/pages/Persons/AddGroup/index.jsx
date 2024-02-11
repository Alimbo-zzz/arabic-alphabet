import React, {useState, useEffect} from 'react';
import {Animate} from '@/contexts';
import {Icon} from '@/components';
import {Link, useNavigate} from 'react-router-dom';
import classNames from 'classnames';
import cls from './style.module.scss';
import {useActions} from '@/hooks';


function AddGroup (props) {
	const navigate = useNavigate();
	const {addGroup} = useActions();
	const [groupName, setGroupName] = useState('');
	const [isValid, setIsValid] = useState(false);



	useEffect(()=>{
		let valid = true;
		let name = groupName.trim().length;
		if(name <= 2) valid = false;
		setIsValid(valid);
	}, [groupName])


	const inpNameOps = {
		type:"text", 
		required: true,
		minLength:4, 
		placeholder:'Введите название группы',
		name:"group",
		autoComplete:'off',
		onChange: e => setGroupName(e.target.value),
		value: groupName,
	}

	const back = () => navigate(-1);


	function send(e){
		e.preventDefault();
		addGroup(groupName);
		back();
	}
	
	return (<>
		<Animate>
			<div className={classNames([cls.wrap, 'container'])}>
				<div className={cls.head}>
					<h2>Создание группы</h2>
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

export default AddGroup;