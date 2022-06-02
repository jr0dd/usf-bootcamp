describe('Helpers test (with setup and teardown)', function () {
  beforeEach(function () {
    billAmtInput.value = 200
    tipAmtInput.value = 30
    submitPaymentInfo()
  })

  it('should sum bill totals on sumPaymentTotal()', function () {
    expect(sumPaymentTotal('billAmt')).toEqual(200)
    billAmtInput.value = 100
    tipAmtInput.value = 15
    submitPaymentInfo()
    expect(sumPaymentTotal('billAmt')).toEqual(300)
  })

  it('should sum tip totals on sumPaymentTotal()', function () {
    expect(sumPaymentTotal('tipAmt')).toEqual(30)
    billAmtInput.value = 100
    tipAmtInput.value = 15
    submitPaymentInfo()
    expect(sumPaymentTotal('tipAmt')).toEqual(45)
  })

  it('should sum tip percent on sumPaymentTotal()', function () {
    expect(sumPaymentTotal('tipPercent')).toEqual(15)
    billAmtInput.value = 100
    tipAmtInput.value = 15
    submitPaymentInfo()
    expect(sumPaymentTotal('tipPercent')).toEqual(30)
  })

  it('should calculate percentages on calculateTipPercent()', function () {
    expect(calculateTipPercent(100, 10)).toEqual(10)
    expect(calculateTipPercent(1000, 7)).toEqual(1)
  })

  it('should create new td on appendTd()', function () {
    const newTr = document.createElement('tr')
    appendTd(newTr, 'new-row')
    expect(newTr.firstChild.innerText).toEqual('new-row')
  })

  it('should create new td on appendDeleteBtn()', function () {
    const newTr = document.createElement('tr')
    appendDeleteBtn(newTr)
    expect(newTr.firstChild.innerText).toEqual('X')
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
