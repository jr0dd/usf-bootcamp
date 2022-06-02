describe('Payments test (with setup and teardown)', function () {
  beforeEach(function () {
    billAmtInput.value = 200
    tipAmtInput.value = 30
  })

  it('should not add a new payment with null entry on submitPaymentInfo()', function () {
    billAmtInput.value = ''
    submitPaymentInfo()
    expect(Object.keys(allPayments).length).toEqual(0)
  })

  it('should add a new payment on submitPaymentInfo()', function () {
    submitPaymentInfo()
    expect(Object.keys(allPayments).length).toEqual(1)
    expect(allPayments['payment1'].billAmt).toEqual('200')
    expect(allPayments['payment1'].tipAmt).toEqual('30')
    expect(allPayments['payment1'].tipPercent).toEqual(15)
  })

  it('should not add a new payment with null entry on createCurPayment()', function () {
    billAmtInput.value = ''
    tipAmtInput.value = ''
    expect(createCurPayment()).toEqual(undefined)
  })

  it('should add a new payment correctly on createCurPayment()', function () {
    const payment = {
      billAmt: '200',
      tipAmt: '30',
      tipPercent: 15,
    }
    expect(createCurPayment()).toEqual(payment)
  })

  it('should create new row on appendPaymentTable()', function () {
    submitPaymentInfo()
    const payment = document.querySelectorAll('#paymentTable tbody tr td')
    expect(payment.length).toEqual(4)
    expect(payment[0].innerText).toEqual('$200')
    expect(payment[1].innerText).toEqual('$30')
    expect(payment[2].innerText).toEqual('15%')
    expect(payment[3].innerText).toEqual('X')
  })

  it('should create entries on updateSummary()', function () {
    submitPaymentInfo()
    expect(summaryTds[0].innerText).toEqual('$200')
    expect(summaryTds[1].innerText).toEqual('$30')
    expect(summaryTds[2].innerText).toEqual('15%')
  })

  afterEach(function () {
    billAmtInput.value = ''
    tipAmtInput.value = ''
    allPayments = {}
    paymentId = 0
    allServers = {}
    serverId = 0
    paymentTbody.innerHTML = ''
    serverTbody.innerHTML = ''
    summaryTbody.innerHTML = ''
  })
})
