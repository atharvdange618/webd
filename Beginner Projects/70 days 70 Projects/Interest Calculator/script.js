let amountInput = document.querySelector('.container .principal-amount input');
let interestInput = document.querySelector('.container .rate-of-interest input');
let timePeriodInput = document.querySelector('.container .time-period input');
let PrincAmount = document.querySelector('.container .result-box .princ-amount');
let interestResult = document.querySelector('.container .result-box .ttl-interest');
let TtlamountResult = document.querySelector('.container .result-box .ttl-amount');
let calculateBtn = document.querySelector('.calculate-btn');

let calculate = () => {
    let p = Number(amountInput.value);
    let r = Number(interestInput.value);
    let t = Number(timePeriodInput.value);

    let simpleInterest = (p * r * t) / 100;
    let amount = p + simpleInterest;

    PrincAmount.innerHTML = `Principal Amount: <strong>Rs ${p.toFixed(2)}</strong>`;
    interestResult.innerHTML = `Total interest: <strong>Rs ${simpleInterest.toFixed(2)}</strong>`;
    TtlamountResult.innerHTML = `Total Amount: <strong>Rs ${amount.toFixed(2)}</strong>`;
}

calculateBtn.addEventListener('click', () => {
    if (amountInput.value != '' && interestInput.value != '' && timePeriodInput.value != '') {
        calculate();
    }
})
