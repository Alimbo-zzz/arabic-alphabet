import React, {useState, useEffect, useRef} from 'react';
import {Animate} from '@/contexts';
import {Icon} from '@/components';
import cls from './info.module.scss';
import classNames from 'classnames';
import {useSelector} from 'react-redux';
import {useActions} from '@/hooks';
import {useParams, useNavigate} from 'react-router-dom';






function InfoPerson (props) {
	const {personId} = useParams();
	const navigate = useNavigate();
	const actions = useActions();
	const {list, exam, group, attendance} = useSelector(state => state.persons);
	const [personData, setPersonData] = useState({});
	const [formOpen, setFormOpen] = useState(false);
	const [inpPhone, setInpPhone] = useState('');
	const [formPhoneValid, setFormPhoneValid] = useState(false);
	const formRef = useRef(null);
	const [openSelectGroup, setOpenSelectGroup] = useState(false);
	const [selectGroupValue, setSelectGroupValue] = useState(null);



	useEffect(()=>{
		const findPerson = list.find(el => el.id === personId);
		if(!findPerson) return;
		const findGroup = group.find(el => el.id === findPerson.group);
		const findAttendance = attendance.map(({data, ...items}) => ({ ...items, status: data.find(el => el.personId === personId)?.status }));
		const findExam = exam.map(({data, ...items}) => ({ ...items, result: data.find(el => el.personId === personId) }));

		let obj = {
			name: findPerson?.name,
			phone: findPerson?.phone,
			group: findGroup?.name,
			attendance: [...findAttendance],
			exam: [...findExam]
		}

		setPersonData(obj)
	}, [list, exam, group, attendance])

	useEffect(()=>{
		const findPerson = list.find(el => el.id === personId);
		if(!findPerson) return;
		const findGroup = group.find(el => el.id === findPerson.group)?.id;
		setSelectGroupValue(findGroup);
	}, [group, list])


	useEffect(()=>{
		document.addEventListener('click', closeFormPhone);
		return (e) => {
			document.removeEventListener('click', closeFormPhone);
		}
	}, [])

	useEffect(()=>{
		if(inpPhone.length < 11) setFormPhoneValid(false);
		else setFormPhoneValid(true);
	}, [inpPhone])

	const back = () => navigate(-1);
	function closeFormPhone() {setFormOpen(false); setInpPhone('') }



	const openFormPhone = (e) => {
		e.stopPropagation();
		setInpPhone(personData?.phone || '')
		setFormOpen(true);
		const inp = formRef?.current?.querySelector('input');
		if(inp) inp.focus();
	}

	const sendForm = (e) => {
		e.preventDefault();
		const findPerson = list.find(el => el.id === personId);
		actions.changePerson({...findPerson, phone: inpPhone})
		closeFormPhone();
	}

	const deletePhone = () => {
		const findPerson = list.find(el => el.id === personId);
		actions.changePerson({...findPerson, phone: null});
		closeFormPhone();
	}

	const setGoupFunc = (data) => {
		actions.updateGroupToPerson({ groupId: data?.id, personId});
		setOpenSelectGroup(false);
	}

	const renderPhone = (phone) => (
		<div className={cls.info}>
			<span className={cls.info__key}>Телефон:</span>
			{
				phone 
				?
				<>
					<h2 className={cls.info__title}> {phone}</h2>
					<div className={cls.info__btns}>
						<a href={'tel:' + phone} className={cls.icon}> <Icon name='phone' /> </a>	
						<button className={cls.icon} onClick={openFormPhone}> <Icon name='edit' /> </button>	
					</div>
				</>
				:
				<>
					<h2 className={cls.info__title}>Нет номера</h2>
					<div className={cls.info__btns}>
						<button className={cls.icon} onClick={openFormPhone}> <Icon name='plus' /> </button>	
					</div>
				</>
			}
		</div>
	)

	const renderGroup = (group) => (
		<div className={cls.info}>
			<span className={cls.info__key}>Группа:</span>
			{
				group
				?
				<>
					<h2 className={cls.info__title}>{group}</h2>
					<div className={cls.info__btns}>
						{
							(group?.length > 1) 
							&& <button className={cls.icon} onClick={() => setOpenSelectGroup(true)}> <Icon name='edit' /> </button>
						}						
					</div>
				</>
				:
				<>
					<h2 className={cls.info__title}>Без группы</h2>
					<div className={cls.info__btns}>
						<button className={cls.icon} onClick={() => setOpenSelectGroup(true)}> <Icon name='plus' /> </button>	
					</div>				
				</>
			}
		</div>	
	)

	const renderExam = (el, i) => (
		<li className={cls.exams__item} key={el.id}>
			<h4 data-name="name">{el.name}</h4>
			<h4 data-name="result">
				{
					el?.result 
					?  
					("Результат:" + el.result.true_answers + "/" + el.result.length_answers)
					:
					("Не пройден")
				}
			</h4>
		</li>
	)
	

	return (<>
		<Animate>
			<div className={classNames([cls.wrap])}>
					<div className={cls.select} data-open={openSelectGroup}>
						<button onClick={() => setOpenSelectGroup(false)} className={cls.select__cross}><Icon name="cross"/></button>
						<ul className={classNames([cls.select__list, 'container'])}>
								<div
									className={cls.select__item} 
									data-active={!selectGroupValue}
									onClick={() => setGoupFunc(null)}
								>Без группы</div>	
							{group?.map(el => 
								<div 
									key={el.id} 
									className={cls.select__item} 
									data-active={el.id === selectGroupValue}
									onClick={() => setGoupFunc(el)}
								>{el.name}</div>	
							)}
						</ul>
					</div>
					<form ref={formRef} onClick={e => e.stopPropagation()} onReset={closeFormPhone} onSubmit={sendForm} className={cls.form} data-open={formOpen}>
						<div className={classNames([cls.form__cont, 'container'])}>
							<div className={cls.form__head}>
								<h3 className={cls.form__title}>Номер телефона</h3>
								<button type='reset'><Icon name='cross'/></button>
							</div>
							<input value={inpPhone} onChange={e => setInpPhone(e.target.value)} type="number"  />	
							<div className={cls.form__btns}>
								<button	type='button' onClick={deletePhone} >Удалить</button>
								<button disabled={!formPhoneValid} type='submit' >Сохранить</button>
							</div>
						</div>
					</form> 
					<div className={cls.head}>
						<div className={classNames([cls.head__cont, 'container'])}>
							<h4 className={cls.head__title}>{personData?.name}</h4>
							<button onClick={back} className={cls.head__close}><Icon name='cross'/></button>
						</div>
					</div>
					<div className={classNames([cls.information, 'container'])}>
						{renderPhone(personData?.phone)}
						{group?.length && renderGroup(personData?.group)}
					</div>
					<div className={cls.exams}>
						<h3 className={cls.exams__title}>Тесты</h3>
						<ul className={cls.exams__list}>
							{personData?.exam?.map(renderExam)}
						</ul>
					</div>
			</div>			
		</Animate>
	</>);
}

export default InfoPerson;