import classNames from 'classnames';
import React, {useState, useEffect} from 'react';
import cls from './style.module.scss';
import sprite from './sprite.svg';
import useDebounce from './useDebounce';


function Search ({setter=null, placeholder='Поиск'}) {
	const [searchValue, setSearchValue] = useState('');
	const debouncedValue = useDebounce(searchValue);

	useEffect(()=> (typeof setter === 'function') && setter(searchValue), [debouncedValue])

	const resetSearch = () => setSearchValue('');

	
	return (<>
		<div className={classNames([cls.search])}>
			<input type="text" placeholder={placeholder} value={searchValue} onChange={e => setSearchValue(e.target.value)} /> 
			<button type='button' onClick={resetSearch} disabled={searchValue.length === 0}>
				<svg> <use xlinkHref={`${sprite}#cross`}/> </svg>
			</button>
		</div>
	</>);
}

export default Search;