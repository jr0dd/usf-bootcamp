describe('Servers test (with setup and tear-down)', function () {
  beforeEach(function () {
    serverNameInput.value = 'Alice'
  })

  it('should not add a new server with null entry on submitServerInfo()', function () {
    serverNameInput.value = ''
    submitServerInfo()
    expect(Object.keys(allServers).length).toEqual(0)
  })

  it('should add a new server to allServers on submitServerInfo()', function () {
    submitServerInfo()
    expect(Object.keys(allServers).length).toEqual(1)
    expect(allServers['server' + serverId].serverName).toEqual('Alice')
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
