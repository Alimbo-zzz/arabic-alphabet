import React, {useState, useEffect} from 'react';
import cls from './style.module.scss';
import {useNavigate} from 'react-router-dom';
import {Icon} from '@/components';
import {Animate} from '@/contexts';
import classNames from 'classnames';
import {useActions} from '@/hooks';
import tests from '@data/exams.json';


function AddTest (props) {
	const navigate = useNavigate();
	const [inpValue, setInpValue] = useState('');
	const [isValid, setIsValid] = useState(false);
	const {addExam} = useActions();
	const [type, setType] = useState(null);

	
	const back = () => navigate(-1);


	const setTitle = () => tests[type] || "Тесты";

	const renderList = () => {
		let arr = [];
		for (let key in tests) {
			arr.push({type: key, title: tests[key]})
		}

		const clickItem = (data) => setType(data.type);

		return <ul className={cls.list}>
			{arr.map((el, i) => <li onClick={() => clickItem(el)} key={i} className={cls.list__item}>
				{el.title}
			</li>)}	
		</ul>
	}


	const renderForm = () => {

		
	const sendForm = (e) => {
		e.preventDefault();
		addExam({name: inpValue, type})
		back();
	}


		return (
			<form className={cls.body__form} onSubmit={sendForm}>
				<input autoComplete='off' required className={cls.inp} placeholder='Введите название теста' type="text" name="test-name" onChange={e => setInpValue(e.target.value)} value={inpValue} />
				<button className={cls.btn} disabled={!isValid}>Создать тест</button>
			</form>
		)
	}


	useEffect(()=>{
		let text = inpValue.trim();
		setIsValid(text.length > 2);
	}, [inpValue])






	return (<>
		<Animate>
			<div className={classNames([cls.wrap, 'container'])}>
				<div className={cls.head}>
					<h3 className={cls.head__title}>{setTitle()}</h3>
					<button className={cls.head__cross} onClick={back}>	<Icon name="cross"/> </button>
				</div>
				<div className={cls.body}>
					{tests[type] ? renderForm() :  renderList()}
				</div>
			</div>
		</Animate>		
	</>);
}

export default AddTest;