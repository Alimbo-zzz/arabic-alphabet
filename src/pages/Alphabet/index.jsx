import React, {useRef} from 'react';
import {Animate} from '@/contexts';
import {Header} from '@/components';
import cls from './style.module.scss'
import classNames from 'classnames';
import AlphabetData from '@data/alphabet.json';
const sounds = import.meta.glob('@sounds/**/*.mp3', {eager:true})

function Alphabet (props) {
	const array = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28]
	const audioRef = useRef(null);

	const getSounds = (type='obj') => {
		let arr = [];
		let obj = {};
		for (const key in sounds) {
			let url = sounds[key].default;
			let name = url.split('/').pop();
			arr.unshift(url)
			obj[name] = url;
		}
		let result = type=='arr' && arr || type=='obj' && obj || 'error'

		return result; 
	}

	const playSound = (btn, index) => {
		let soundsObj = getSounds('obj');
		let url = soundsObj[(index + 1) + '.mp3']; 
		// var player = new Audio(url);
		var player = audioRef.current;
		player.src = url;
		player.play();
		btn.disabled = true;
		btn.dataset.active = 'true';

		setTimeout(() => {
			btn.disabled = false;
			btn.dataset.active = 'false';			
		}, 1800);

	}  
 
	
	const LetterRender = (el, i) => (
		<li className={cls.item} key={i}>
			<h4>{AlphabetData[el][4]}</h4>
			<h4>{AlphabetData[el][3]}</h4>
			<h4>{AlphabetData[el][2]}</h4>
			<h4>{AlphabetData[el][1]}</h4>
			<button onClick={(btn) => playSound(btn.target, i)}>{AlphabetData[el][0]}</button>
		</li>
	)
	
	return (<>
		<Animate>
			<audio ref={audioRef} style={{visibility: 'hidden'}}/>
			<div className={classNames([cls.wrap, 'container'])}>	
				<Header title={'Алфавит'}/>

				<div className={cls.description}>
					<h4>О – Основная форма</h4>
					<h4>Н – Начальная форма</h4>
					<h4>С – Серединная форма</h4>
					<h4>К – Конечная форма</h4>
				</div>

				<ul className={cls.list}>
					<li className={cls.item}>
						<h4>К</h4>
						<h4>С</h4>
						<h4>Н</h4>
						<h4>О</h4>
					</li>
					{array.map(LetterRender)}
				</ul>
			</div>
		</Animate>
	</>);
}

export default Alphabet;