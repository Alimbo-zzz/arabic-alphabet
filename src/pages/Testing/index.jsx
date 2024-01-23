import React, {useState} from 'react';
import {Animate} from '@/contexts';
import {Header} from '@/components';
import cls from './style.module.scss';
import AlphabetData from '@data/alphabet.json';


function Testing (props) {
	const [slides, setSlides] = useState([]);


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


	const getRandomData = (num=10) => {
		let array = [];
		for (const key in AlphabetData) {	
			AlphabetData[key].forEach((el, i) => {
				if(i === 0) return;
				array.push({sound: key,	simbol: el, text: AlphabetData[key][0]});
			})
		}

		return shuffle(array).slice(0, num)
	}


	getRandomData()
	
	return (<>
		<Animate>
			<div className={cls.wrap}>
				<Header title={'Тестирование'} />


			</div>
		</Animate>
	</>);
}

export default Testing;