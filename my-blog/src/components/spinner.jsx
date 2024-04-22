import spinnerB from '/spinner.svg';
import spinnerW from '/spinnerW.svg';
import useLocalStorage from './useLocalStorage';

export default function Spinner({theme}){

    return <div className='spinner'>
        {
            <img src={ theme === 'light' ? spinnerB : spinnerW } />
        }
    </div>
};