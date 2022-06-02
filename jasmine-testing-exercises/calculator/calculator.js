window.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('calc-form')
  if (form) {
    setupIntialValues()
    form.addEventListener('submit', function (e) {
      e.preventDefault()
      update()
    })
  }
})

function getCurrentUIValues() {
  return {
    amount: +document.getElementById('loan-amount').value,
    years: +document.getElementById('loan-years').value,
    rate: +document.getElementById('loan-rate').value,
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const initialValues = {
    amount: 100000,
    years: 30,
    rate: 3.0,
  }
  const amount = document.getElementById('loan-amount')
  console.log(amount.value)
  const years = document.getElementById('loan-years')
  console.log(years.value)
  const rate = document.getElementById('loan-rate')
  console.log(rate.value)
  amount.value = initialValues.amount
  years.value = initialValues.years
  rate.value = initialValues.rate
  update()
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const values = getCurrentUIValues()
  updateMonthly(calculateMonthlyPayment(values))
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const P = values.amount
  const i = values.rate / 100 / 12
  const n = values.years * 12
  let monthlyPayment = ((P * i) / (1 - Math.pow(1 + i, -n))).toFixed(2)
  if (monthlyPayment === 'NaN') {
    return (monthlyPayment = '0.00')
  }
  return monthlyPayment
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  const payment = document.getElementById('monthly-payment')
  return (payment.innerText = '$' + monthly)
}
