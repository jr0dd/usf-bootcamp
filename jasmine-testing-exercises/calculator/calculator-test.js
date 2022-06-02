it('should calculate the monthly rate correctly', function () {
  expect(
    calculateMonthlyPayment({ amount: 120000, rate: 5.5, years: 30 })
  ).toEqual('681.35')
})

it('should return a result with 2 decimal places', function () {
  expect(
    calculateMonthlyPayment({ amount: 10, rate: 5.333, years: 20 })
  ).toEqual('0.07')
})

it('should not return NaN for all zeros', function () {
  expect(calculateMonthlyPayment({ amount: 0, rate: 0, years: 0 })).toEqual(
    '0.00'
  )
})
