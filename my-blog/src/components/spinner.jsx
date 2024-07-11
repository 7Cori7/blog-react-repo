import spinnerB from '/spinner.svg';
import spinnerW from '/spinnerW.svg';

export default function Spinner({theme}){

    return <div className='spinner'>
        {
            <img src={ theme === 'light' ? spinnerB : spinnerW } />
        }
    </div>
};