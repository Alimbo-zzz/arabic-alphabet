import React, {useState, useEffect} from 'react';
import { v4 as setId } from 'uuid';
import {Animate} from '@/contexts';
import {Header, Checkbox, Select} from '@/components';
import cls from './style.module.scss';
import AlphabetData from '@data/alphabet.json';
import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from 'classnames';
import {useNavigate, useParams, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useActions} from '@hooks';

import 'swiper/css';
import './swiper.scss';


function Testing (props) {
	const {testId} = useParams();
	const persons = useSelector(state => state.persons.list);
	const exams = useSelector(state => state.persons.exam);
	const actions = useActions();
	const location = useLocation();
	const navigate = useNavigate();
	const [slides, setSlides] = useState([]);
	const [swiper, setSwiper] = useState(null);
	const [activeIndex, setActiveIndex] = useState(0);
	const [testFinal, setTestFinal] = useState(false);
	const [testResult, setTestResult] = useState([]);
	const [isTestPage, setTestPage] = useState(false);
	const [valid, setValid] = useState(false);
	const [allLettersSelected, setAllLettersSelected] = useState(false);
	const [selectLimit, setSelectLimit] = useState('');
	const [selectPerson, setSelectPerson] = useState('');
	const [defaultPerson, setDefaultPerson] = useState('');
	const [letters, setLetters] = useState([])
	const [vocalization, setVocalization] = useState(false);



	const personTestCompleted = (personId) => exams.find(el => el.id === testId)?.data.find(el => el.personId === personId) ? true : false;
	const selectPersonOps = [...persons].map(el => ({value: el.id, label: el.name, mark: personTestCompleted(el.id)}))

	const selectLimitOps = [
		{value: '15', label: '15'},
		{value: '30', label: '30'},
		{value: '50', label: '50'},
		{value: '200', label: 'МАХ'},
	]

	const swiperOps = {
		spaceBetween: 50,
		allowTouchMove: false,
		onSwiper: setSwiper,
		onSlideChange: (e) => setActiveIndex(e.activeIndex),
	}


	const checkValid = () => {
		let isValid = true;
		let allCheckBoxEmpty = true;
		let allChecked = true;
		letters.forEach(el => el.checked && (allCheckBoxEmpty = false));
		letters.forEach(el => !el.checked && (allChecked = false));
		if(!selectPerson || allCheckBoxEmpty) isValid = false;
		setAllLettersSelected(allChecked);
		setValid(isValid);
	}

	const getLettersArray = () => {
		let array = [];
		for (const key in AlphabetData) {
			let obj = {id: key, data: AlphabetData[key], checked: false};
			array.push(obj);
		}
		return array;
	}

	useEffect(()=>{
		setLetters(getLettersArray());
		let savePerson = window.localStorage.getItem('arabic-alphabet-person');
		let saveLetters = window.localStorage.getItem('arabic-alphabet-letters');
		if(savePerson) setDefaultPerson(savePerson);
		if(saveLetters) setLetters(JSON.parse(saveLetters));
	}, [])
	useEffect(()=>{ if(slides.length && slides.length === testResult.length) setTestFinal(true) }, [testResult])
	useEffect(checkValid, [letters, selectPerson, allLettersSelected])

	const shuffle = (array) => {
		let m = array.length, t, i;
		// Пока есть элементы для перемешивания
		while (m) {
			// Взять оставшийся элемент
			i = Math.floor(Math.random() * m--);
			// И поменять его местами с текущим элементом
			t = array[m];
			array[m] = array[i];
			array[i] = t;
		}
	
		return array;
	}

	const getRandomData = (num=10, letters=[]) => {
		let array = [];
		let voices = [' َ', ' ِ', ' ُ'];
		for (const key in AlphabetData) {	
			AlphabetData[key].forEach((el, i) => {
				if(i === 0) return;
				if(letters.length && !letters.includes(key)) return;
				let voice = vocalization ? shuffle(voices)[0] : '';
				array.push({sound: key,	simbol: el, text: AlphabetData[key][0], voice, id: setId(), });
			})
		}

		return shuffle(array).slice(0, num)
	}

	const pickAll = () => {
		let AllPick = [...letters].map(el => ({...el, checked: true}))
		let AllDisable = [...letters].map(el => ({...el, checked: false}))
		let allChecked = true;
		letters.forEach(el => !el.checked && (allChecked = false))
		let result = allChecked ? AllDisable : AllPick;
		setLetters(result)
	}

	const changeCheckbox = (data) => {
		let allChecked = true;
		let newLetters = [...letters].map(el => (el.id === data.id) ? {...el, checked: !el.checked} : el);
		newLetters.forEach(el => {
			!el.checked && (allChecked = false);
		})
		setAllLettersSelected(allChecked);
		setLetters(newLetters)
	}


	const send = (e) => {
		e.preventDefault();
		let lettersArray = [];
		const allCheckBox = e.target.querySelectorAll('[name="letters"] input[type="checkbox"]');
		allCheckBox.forEach(el => el.checked && (lettersArray.push(el.name)));

		const data = getRandomData(selectLimit, lettersArray);
		window.localStorage.setItem('arabic-alphabet-person', selectPerson)
		window.localStorage.setItem('arabic-alphabet-letters', JSON.stringify(letters))
		setSlides(data);
		setTestPage(true);
	}

	const goSlide = (value, item, index, btn) => {
		let obj = {	...item, answer: value }
		setTestResult(prev => [...prev, obj]);
		btn.parentNode.querySelectorAll('button').forEach(el => el.disabled = true);
		swiper?.slideNext();
	}

	const renderCheckbox = (el, i) => (
		<label key={el.id} className={cls.letter}>
			<h4>{el.data[1]}</h4>
			<Checkbox name={el.id} checked={el.checked} onChange={(e) => changeCheckbox(el)} />
		</label>
	);


	const getResultText = () => {
		let true_values = 0;
		testResult.forEach((el, i) => el.answer && (true_values += 1))
		return `Результат: ${true_values} из ${testResult.length}`
	}

	const getPersonToId = (id) => persons.find(el => el.id === id);

	const sendTestResult = (e) => {
		e.preventDefault();
		let true_answers = 0;
		let length_answers = testResult.length;
		let id = testId;
		let personId = selectPerson;
		testResult.forEach((el, i) => el.answer && (true_answers += 1));
		
		let result = {length_answers, true_answers, personId, id};
		actions.addTestOnPerson(result)
		navigate('/')
	}

	const changeFinalCheckbox = (e) => {
		let checked = e.target.checked;
		let value = e.target.value;
		const newArr = testResult.map(el => el.id === value ? ({...el, answer: checked}) : el) 
		setTestResult(newArr);
	}

	const playSound = (e, item) =>{
		const simbol = e.target;
		// const player = simbol.parentNode.querySelector('audio');
		let url = 'sounds/' + item.sound + '.mp3'; 
		var player = new Audio(url);
		simbol.disabled = true;
		player.play();
		const close = setTimeout(() => (simbol.disabled === true) ? (simbol.disabled = false) : null , 3000)

		player.onended = () => {
			simbol.disabled = false;
			clearTimeout(close);
		};

	}


	const renderSlide = (el, i) => (
		<SwiperSlide key={i}>
			<div className={cls.slide}>
				{/* <audio src={'sounds/' + el.sound + '.mp3'}></audio> */}
				<button className={cls.slide__simbol} style={{pointerEvents: vocalization ? 'none' : 'auto'}} onClick={(e) => playSound(e, el)}>{el.voice + el.simbol}</button>
				<div className={cls.slide__controls}>
					<button data-btn={false} onClick={(e) => goSlide(false, el, i, e.target)}>Неверно</button>
					<button data-btn={true} onClick={(e) => goSlide(true, el, i, e.target)}>Верно</button>
				</div>
			</div>
		</SwiperSlide>
	)
	

	return (<Animate>		
		{
			!isTestPage && !testFinal && 
			<div className={classNames([cls.wrap, 'container'])}>
				<Header title={'Тестирование'} />
				<form className={cls.letters} onSubmit={send}>
					<Select defaultValue={defaultPerson} search={true} onChange={checkValid} options={selectPersonOps} placeholder="Выберите человека"  width={'100%'} setter={setSelectPerson} />
					<div className={cls.letters__head}>
						<label className={cls.letters__vocalization}>
							<h4>Огласовки</h4>
							<Checkbox onChange={(e) => setVocalization(e.target.checked)} type="square"/>
						</label>
						<button className={cls.letters__btn} type='button' onClick={pickAll}> {allLettersSelected ? "Убрать всё" : "Выбрать всё"}</button>
					</div>
					<div name="letters" className={cls.letters__grid}>
						{letters.map(renderCheckbox)}
					</div>
					<div className={cls.letters__length}>
						<h4>Колличество вопросов</h4>
						<Select options={selectLimitOps} defaultValue={'15'} width={'100px'} setter={setSelectLimit} />
					</div>					
					<button disabled={!valid} type="submit" className={cls.letters__btn}>Начать</button>
				</form>
			</div>
		}

		{
			isTestPage && !testFinal && 
			<div className={classNames([cls.slider, 'container'])}>
				<div className={cls.slider__title}>
					<h2>Тест проходит</h2>
					<h2>{getPersonToId(selectPerson)?.name}</h2>
				</div>
				<div className={cls.slider__index}>{activeIndex + 1} / {slides.length}</div>
				<Swiper {...swiperOps}>
					{slides?.map(renderSlide)}
				</Swiper>
			</div>
		}

		{
			testFinal && 
			<div className={classNames([cls.results, 'container'])}>
				<Header title={'Результаты'} />
				<form className={cls.results__form} onSubmit={sendTestResult}>
					<ul name="results" className={cls.results__list}>
						{testResult.map((el, i) => <label className={cls.results__item} key={el.id}>
							<span>{i + 1}.</span>
							<div data-name='inp'>
								<input value={el.id} onChange={changeFinalCheckbox} type="checkbox" defaultChecked={el.answer} />
								<h4>{el.voice + el.simbol}</h4>
							</div>
						</label>)}
					</ul>
					<div className={cls.results__info}> 
						<h2>{getPersonToId(selectPerson).name}</h2>
						<h2>{getResultText()}</h2>
					</div>
					<button className={cls.letters__btn} type='submit'>Сохранить результат</button>
				</form>
			</div>
		}
	</Animate>);
}

export default Testing;