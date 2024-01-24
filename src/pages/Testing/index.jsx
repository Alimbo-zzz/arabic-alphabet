import React, {useState, useEffect} from 'react';
import {Animate} from '@/contexts';
import {Header} from '@/components';
import cls from './style.module.scss';
import AlphabetData from '@data/alphabet.json';
import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from 'classnames';
import {useNavigate} from 'react-router-dom';

import 'swiper/css';
import './swiper.scss';


function Testing (props) {
	const navigate = useNavigate();
	const [slides, setSlides] = useState([]);
	const [swiper, setSwiper] = useState(null);
	const [testFinal, setTestFinal] = useState(false);
	const [testResult, setTestResult] = useState([]);
	const [isTestPage, setTestPage] = useState(false);
	const [valid, setValid] = useState(false);
	const [allLettersSelected, setAllLettersSelected] = useState(false);
	const array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]


	const swiperOps = {
		spaceBetween: 50,
		allowTouchMove: false,
		onSwiper: setSwiper,
		// onSlideChange: (e) => console.log(e),
	}


	useEffect(()=>{ if(slides.length && slides.length === testResult.length) setTestFinal(true) }, [testResult])

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

		for (const key in AlphabetData) {	
			AlphabetData[key].forEach((el, i) => {
				if(i === 0) return;
				if(letters.length && !letters.includes(key)) return;

				array.push({sound: key,	simbol: el, text: AlphabetData[key][0]});
			})
		}

		return shuffle(array).slice(0, num)
	}

	const pickAll = (e) => {
		const allCheckBox = e.target.parentNode.querySelector('[name="letters"]').querySelectorAll('input[type="checkbox"]')
		let allChecked = true;
		allCheckBox.forEach(el => !el.checked && (allChecked = false))
		if(allChecked){
			setAllLettersSelected(false);
			setValid(false);
			allCheckBox.forEach(el => el.checked = false);
		} 
		else {
			setAllLettersSelected(true);
			setValid(true);
			allCheckBox.forEach(el => el.checked = true);
		}
	}

	const changeCheckbox = (e) => {
		const allCheckBox = e.target.parentNode.parentNode.parentNode.querySelector('[name="letters"]').querySelectorAll('input[type="checkbox"]')
		let allChecked = true;
		let isEmpty = true;
		allCheckBox.forEach(el => {
			!el.checked && (allChecked = false);
			el.checked && (isEmpty = false);
		})
		setAllLettersSelected(allChecked);
		setValid(!isEmpty);
	}

	const renderCheckbox = (el, i) => (
		<label key={el} className={cls.letter}>
			<h4>{AlphabetData[el][1]}</h4>
			<input type="checkbox" name={el} onChange={changeCheckbox} />
		</label>
	);

	const send = (e) => {
		e.preventDefault();
		let lettersArray = [];
		const limit = Number(e.target.querySelector('[name="limit"]').value);
		const allCheckBox = e.target.querySelector('[name="letters"]').querySelectorAll('input[type="checkbox"]');
		allCheckBox.forEach(el => el.checked && (lettersArray.push(el.name)));

		const data = getRandomData(limit, lettersArray);
		setSlides(data);
		setTestPage(true);
	}

	const goSlide = (value, item, index, btn) => {
		let obj = {	...item, answer: value }
		setTestResult(prev => [...prev, obj]);
		btn.parentNode.querySelectorAll('button').forEach(el => el.disabled = true);
		swiper?.slideNext();
	}


	const getResultText = () => {
		let true_values = 0;
		testResult.forEach((el, i) => el.answer && (true_values += 1))
		return `Результат: ${true_values} из ${testResult.length}`
	}

	const sendTestResult = (e) => {
		e.preventDefault();
		navigate('/')
	}

	const renderSlide = (el, i) => (
		<SwiperSlide key={i}>
			<div className={cls.slide}>
				<h1>{el.simbol}</h1>
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
					<h3>Выберите буквы для теста</h3>
					<button className={cls.letters__btn} type='button' onClick={pickAll}> {allLettersSelected ? "Убрать всё" : "Выбрать всё"}</button>
					<div name="letters" className={cls.letters__grid}>
						{array.map(renderCheckbox)}
					</div>
					<div className={cls.letters__length}>
						<h4>Колличество вопросов</h4>
						<select name="limit">
							<option defaultValue value="15">15</option>
							<option value="30">30</option>
							<option value="50">50</option>
							<option value="100">80</option>
							<option value="200">МАХ</option>
						</select>
					</div>
					<button disabled={!valid} type="submit" className={cls.letters__btn}>Начать</button>
				</form>
			</div>
		}

		{
			isTestPage && !testFinal && 
			<div className={classNames([cls.slider, 'container'])}>
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
					<ul className={cls.results__list}>
						{testResult.map((el, i) => <label data className={cls.results__item} key={i}>
							<span>{i + 1}.</span>
							<h4>{el.simbol}</h4>
							<input name={el.sound} type="checkbox" defaultChecked={el.answer} />
						</label>)}
					</ul>
					<h2>{getResultText()}</h2>
					<button className={cls.letters__btn} type='submit'>Сохранить результат</button>
				</form>
			</div>
		}
	</Animate>);
}

export default Testing;