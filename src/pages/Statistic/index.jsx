import React, {useState, useEffect} from 'react';
import {Animate} from '@/contexts';
import {Header} from '@/components';
import { PieChart } from '@mui/x-charts/PieChart';
import cls from './style.module.scss';
import {useSelector} from 'react-redux';


function Statistic (props) {
	const personsData = useSelector(state => state.persons.list);
	const [rating, setRating] = useState({"1":[],"2":[],"3":[],"4":[],"5":[]});
	const [data, setData] = useState([
		{ id: '1', value: 0, color: '#D33934', text: 'Очень плохо' },
		{ id: '2', value: 0, color: '#EAA340', text: 'Плохо' },
		{ id: '3', value: 0, color: '#C437F3', text: 'Удовлетворительно' },
		{ id: '4', value: 0, color: '#3F96F3', text: 'Хорошо' },
		{ id: '5', value: 0, color: '#54C05C', text: 'Отлично' },
	]);

	const chartOps = {
		data,
		innerRadius: 26,
		outerRadius: 135,
		paddingAngle: 2,
		cornerRadius: 5,
		startAngle: -90,
		endAngle: 1000,
		cx: 175,
		cy: 175,
		highlightScope: { faded: 'global', highlighted: 'item' },
		faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
	}


	useEffect(()=>{
		// let result = {"1":[],"2":[],"3":[],"4":[],"5":[]};
		// personsData.forEach(person => {
		// 	person.exam.forEach((test, i) => {
		// 		console.log(test)
		// 		let true_answer = Math.round((100 * test.filter(el => el.answer).length) / test.length);
		// 		let false_answer = Math.round((100 * test.filter(el => !el.answer).length) / test.length);
		// 		let obj = {personId: person.id, testIndex: i }
		// 		if(true_answer >= 90) return result["5"].push(obj);
		// 		else if(true_answer >= 70) return result["4"].push(obj);
		// 		else if(true_answer >= 50) return result["3"].push(obj);
		// 		else if(true_answer >= 30) return result["2"].push(obj);
		// 		else return result["1"].push(obj);
		// 	})
		// })
		// setRating(result);
	}, [personsData])

	useEffect(()=>{
		let arr = [
			{ id: '1', value: 0, color: '#D33934', text: 'Очень плохо' },
			{ id: '2', value: 0, color: '#EAA340', text: 'Плохо' },
			{ id: '3', value: 0, color: '#C437F3', text: 'Удовлетворительно' },
			{ id: '4', value: 0, color: '#3F96F3', text: 'Хорошо' },
			{ id: '5', value: 0, color: '#54C05C', text: 'Отлично' },
		];
		let newArr = arr.map(el => {
			let obj = {...el};
			for (const key in rating) {
				el.id === key && (obj.value = rating[key].length);
			}
			return obj;
		})

		setData(newArr);
	}, [rating])
	
	return (<>
		<Animate>
			<div>
				<Header title="Статистика"/>
				{/* <div className={cls.chart}>
					<PieChart series={[chartOps]} width={360} height={360} />

					<ul className={cls.chart__list}>
						{data.map(el => <li key={el.id} className={cls.chart__item}>
							<div data-name="color" style={{background: el.color}}>{el.id}</div>
							<div data-name="text">{el.text}</div>
							<div data-name="value">{el.value}</div>
						</li>)}
					</ul>
				</div> */}
			</div>
		</Animate>
	</>);
}

export default Statistic;