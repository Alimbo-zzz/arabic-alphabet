import React, {useState, useEffect} from 'react';
import {Animate} from '@/contexts';
import {Header, Icon } from "@/components";
import classNames from 'classnames';
import {useSelector} from 'react-redux';
import {useActions} from '@hooks';

import cls from './style.module.scss'


function Persons (props) {
	const persons = useSelector(state => state.persons);
	const actions = useActions();
	const [personData, setPersonData] = useState(null);
	const [modalIsOpen, setModalIsOpen] = useState(false);


	useEffect(()=>{
		console.log(personData)
		if(personData !== null) setModalIsOpen(true); 
	}, [personData])
	
	const addPerson = (e) => {
		e.preventDefault();
		let name = e.target.querySelector('input[name="person"]').value;
		actions.addPerson(name);
		e.target.reset();
	}


	const closeModal = () => {setModalIsOpen(false); setPersonData(null);}

	const deletePerson = () => {
		const aa = confirm('Вы точно хотите удалить?');
		if(!aa) return;
		actions.deletePerson(personData.id);
		closeModal();
	};
	const renderItem = el => (<li key={el.id} className={cls.item}>
		<h4>{el.name}</h4>
		<button onClick={() => setPersonData(el)}><Icon name='books'/></button>
	</li>);

	const getStateToTest = (i) => {
		if(!personData) return '';
		let trueAnwers = 0;
		personData.data[i]?.forEach((el, i) => el.answer && (trueAnwers += 1));
		return `${trueAnwers}/${personData.data[i]?.length}`;
	}

	return (<>
		<Animate>
			<div className={classNames([cls.wrap])}>
				<div className='container'>
					<Header title="Люди"/>
						
					<form autoComplete="off" onSubmit={addPerson} className={cls.form}>
						<input autoComplete='off' placeholder='Введите имя, фамилию' type="text" name="person" required />
						<button type='submit' >Добавить персону</button>
					</form>
				</div>

				<ul className={cls.list}>
					{persons.map(renderItem)}
				</ul>
			</div>

			<div data-open={modalIsOpen} className={classNames([cls.modal])}>
				<div className={classNames([cls.modal__cont, 'container'])}>
					<div className={cls.modal__head}>
						<button className={cls.modal__close} onClick={closeModal}>Х</button>
					</div>
					<h2>{personData?.name}</h2>
					<button className={cls.modal__delete} onClick={deletePerson}>Удалить персону</button>
					<h3>История тестирования</h3>
					<ul>
						{personData?.data?.map((el, i) => <li key={i}>
							<h4>Тест №{i+1}: {getStateToTest(i)}</h4>
						</li>)}
					</ul>			
				</div>
			</div>
		</Animate>
	</>);
}

export default Persons;