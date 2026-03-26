import React,{ useState } from "react"


export const ExchangeRate = ({exchRate, handleRate}) => {
    return (
        <div>
        <h3> ExChange rate :</h3>
        <h5> 1 USD = </h5> SGD
        <input type='number' value={exchRate} onChange={handleRate}></input>
        </div>
    )
}

export const USD = ({usdAmount, calculateSGD}) => {
    return (
        <div>
        <h5> USD </h5>
        <input type='number' value={usdAmount} onChange={calculateSGD}></input>
        </div>
    )
}

export const SGD = ({sgdAmount, calculateUSD}) => {
    return (
        <div>
        <h5> SGD </h5>
        <input type='number' value={sgdAmount} onChange={calculateUSD}></input>
        </div>
    )
}


const Exchange = () => {
    const [exchRate, setExchRate] = useState(3.5);
    // ✅ '' instead of 0 — controlled number inputs with value=0 always show 0,
    //    making it impossible to clear the field. Empty string shows a blank input.
    const [usdAmount, setUsdAmount] = useState('');
    const [sgdAmount, setSgdAmount] = useState('');

    function getRate(e) {
        const rate = parseFloat(e.target.value) || 0;
        setExchRate(rate);
        // Recalculate SGD when rate changes, only if USD already has a value
        setSgdAmount(usdAmount === '' ? '' : (parseFloat(usdAmount) * rate).toFixed(2));
    }

    function calculateUSD(e) {
        const sgd = e.target.value;                // ✅ keep raw string — don't force 0
        setSgdAmount(sgd);                         // ✅ reflect what the user typed
        setUsdAmount(sgd === '' ? '' : (parseFloat(sgd) / exchRate).toFixed(2));
    }

    function calculateSGD(e) {
        const usd = e.target.value;                // ✅ keep raw string
        setUsdAmount(usd);
        setSgdAmount(usd === '' ? '' : (parseFloat(usd) * exchRate).toFixed(2));
    }

    return (
        <div>
            <ExchangeRate handleRate={getRate} exchRate={exchRate}></ExchangeRate>
            <p>Rate: {exchRate}</p>

            <USD  usdAmount={usdAmount} calculateSGD={calculateSGD}/>
            <SGD  sgdAmount={sgdAmount} calculateUSD={calculateUSD}/>
        </div>
    )
}

export default Exchange

