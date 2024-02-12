import React, {useState, useEffect} from 'react';
import cls from './style.module.scss';
import {useNavigate, useParams} from 'react-router-dom';
import {Icon} from '@/components';
import {Animate} from '@/contexts';
import classNames from 'classnames';
import {useActions} from '@/hooks';

function AddTest (props) {
	const navigate = useNavigate();
	const params = useParams();
	const [inpValue, setInpValue] = useState('');
	const [isValid, setIsValid] = useState(false);
	const {addExam} = useActions();

	const tests = {
		alphabet: 'Алфавит'
	}
	
	const back = () => navigate(-1);

	useEffect(()=>{
		let text = inpValue.trim();
		setIsValid(text.length > 2);
	}, [inpValue])


	const sendForm = (e) => {
		e.preventDefault();
		addExam({name: inpValue, type: params.testName})
		back();
	}


	return (<>
		<Animate>
			<div className={classNames([cls.wrap, 'container'])}>
				<div className={cls.head}>
					<h3 className={cls.head__title}>{tests[params.testName]}</h3>
					<button className={cls.head__cross} onClick={back}>	<Icon name="cross"/> </button>
				</div>
				<div className={cls.body}>
					<form className={cls.body__form} onSubmit={sendForm}>
						<input autoComplete='off' required className={cls.inp} placeholder='Введите название теста' type="text" name="test-name" onChange={e => setInpValue(e.target.value)} value={inpValue} />
						<button className={cls.btn} disabled={!isValid}>Создать тест</button>
					</form>
				</div>
			</div>
		</Animate>		
	</>);
}

export default AddTest;