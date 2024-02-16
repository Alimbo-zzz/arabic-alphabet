import React, {useState, useEffect} from 'react';
import {Animate} from '@/contexts';
import {Header} from '@/components';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import cls from './style.module.scss';
import {useSelector} from 'react-redux';
import './chart.scss';


function Statistic (props) {
	const {attendance, exam} = useSelector(state => state.persons);
	const [rating, setRating] = useState({"1":[],"2":[],"3":[],"4":[],"5":[]});
	const [attendaceIndex, setAttendaceIndex] = useState(0);
	const [attendaceArr, setAttendaceArr] = useState([]);
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
		let maxLine = 5;
		let arr = [...attendance].reverse();
		let result = []
		while(arr.length) result.push(arr.splice(0, maxLine));
		setAttendaceArr(result)
	}, [attendance, attendaceIndex])


	const getSeries = () => {
		let arr = attendaceArr[attendaceIndex];
		let attend =	arr?.map(lesson => {
			let result = 0;
			lesson.data.forEach(el => el.status === 'attend' && (result += 1))
			return result
		});
		let reason =	arr?.map(lesson => {
			let result = 0;
			lesson.data.forEach(el => el.status === 'reason' && (result += 1))
			return result
		});
		let absent =	arr?.map(lesson => {
			let result = 0;
			lesson.data.forEach(el => el.status === 'absent' && (result += 1))
			return result
		});
		let result = [
			{data: attend || [], color: '#1ED50E', label: 'Присутсвие'}, 
			{data: reason || [], color: '#DEB80C', label: 'Причина'}, 
			{data: absent || [], color: '#C92E23', label: 'Пропуск'}
		];

		return result;
	}

	const getXAxis = () => attendaceArr[attendaceIndex]?.map(lesson => lesson.name);


	const chartLineOps = {
		xAxis: [{data: getXAxis() || [], scaleType: 'point',}], 
		series: getSeries(),
		width:500,
		height:300,
	}

	useEffect(()=>{
		let result = {"1":[],"2":[],"3":[],"4":[],"5":[]};

		const setResult = (exam, examIndex) => {
			exam.data.forEach((el, i) => {				
				let true_answer = Math.round((100 * el.true_answers) / el.length_answers);
				let id = el.personId;
				if(true_answer >= 90) return result["5"].push(id);
				else if(true_answer >= 70) return result["4"].push(id);
				else if(true_answer >= 50) return result["3"].push(id);
				else if(true_answer >= 30) return result["2"].push(id);
				else return result["1"].push(id);
			})
		}

		exam?.forEach(setResult);
		setRating(result);
	}, [exam])

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
			<div className={cls.wrap}>
				<div className='container'>
					<Header title="Статистика"/>
				</div>
				<div className={cls.chart}>
					<h2 className={cls.chart__title}>Все экзамены</h2>
					<PieChart series={[chartOps]} width={360} height={360} />

					<ul className={cls.chart__list}>
						{data.map(el => <li key={el.id} className={cls.chart__item}>
							<div data-name="text">{el.text}</div>
							<div data-name="color" style={{background: el.color}}>{el.value}</div>
						</li>)}
					</ul>
				</div>
				
				<div className={cls.chartLine}>
					<h2 className={cls.chartLine__title}>Посещаемость</h2>
					<LineChart {...chartLineOps} />
					<ul className={cls.chartLine__list}>
						{
							attendaceArr?.length > 1 &&
							attendaceArr?.map((_, index) => 
								<li 
									onClick={() => setAttendaceIndex(index)} 
									className={cls.chartLine__pag} 
									key={index}
									data-active={index === attendaceIndex}
								>{index + 1}</li>
							)
						}
					</ul>
				</div>
			</div>
		</Animate>
	</>);
}

export default Statistic;