import React, {useState, useEffect} from 'react';
import {Animate} from '@/contexts';
import {Icon, Select} from '@/components';
import {Link, useNavigate} from 'react-router-dom';
import classNames from 'classnames';
import cls from './style.module.scss';
import {useSelector} from 'react-redux';
import {useActions} from '@/hooks';


function AddPerson (props) {
	const navigate = useNavigate();
	const {addPerson} = useActions();
	const groups = useSelector(state => state.persons.group);
	const [personName, setPersonName] = useState('');
	const [personPhone, setPersonPhone] = useState('');
	const [selectValue, setSelectValue] = useState('');
	const [isValid, setIsValid] = useState(false);



	useEffect(()=>{
		let valid = true;
		let name = personName.trim().length;
		let phone = personPhone.trim().length;

		if(name <= 4) valid = false;
		if(phone > 0 && phone <= 11) valid = false;

		setIsValid(valid);
	}, [personPhone, personName])


	const inpNameOps = {
		type:"text", 
		required: true,
		minLength:4, 
		placeholder:'Введите Имя, Фамилию',
		name:"person",
		autoComplete:'off',
		onChange: e => setPersonName(e.target.value),
		value: personName,
	}
	const inpPhoneOps = {
		type:"number",
		placeholder:'Номер телефона',
		name:"phone",
		autoComplete:'off',
		onChange: e => setPersonPhone(e.target.value),
		value: personPhone,
	}

	const selectOps = [
		{label: 'Без группы', value: 'none'},
		...groups.map(el => ({value: el.id, label: el.name}))
	]

	
	const back = () => navigate(-1);

	function send(e){
		e.preventDefault();

		let data = {
			name: personName,
			phone: personPhone,
			group: selectValue,
		}

		addPerson(data);
		back()
	}
	
	return (<>
		<Animate>
			<div className={classNames([cls.wrap, 'container'])}>
				<div className={cls.head}>
					<h2>Создание персоны</h2>
					<button className={cls.cross} onClick={back}><Icon name="cross"/></button>
				</div>
				<form autoComplete='off' onSubmit={send} className={cls.form}>
					<input className={cls.form__inp} {...inpNameOps} />
					<input className={cls.form__inp} {...inpPhoneOps} />
					<div className={cls.form__select}>
						<h4>Группа:</h4>
						<Select width='100%' setter={setSelectValue} options={selectOps}/>
					</div>
					<button disabled={!isValid} type='submit' className={cls.form__btn}>Создать</button>
				</form>
			</div>
		</Animate>
	</>);
}

export default AddPerson;