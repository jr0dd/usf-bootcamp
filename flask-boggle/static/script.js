class Game {
  constructor (seconds=60) {
    this.seconds = seconds
    this.score = 0
    this.game = $('#game-container')
    this.wordList = new Set()
    this.timer = $('#timer', this.game)
    this.timer.text(this.seconds)
    this.startTimer()

    $('#search', this.game).on('submit', this.checkWord.bind(this))
  }

  printMessage (msg, interval) {
    const $msg = $('#message', this.game)
    $msg.text(msg).show()
    if (interval) {
      setTimeout(() => $msg.hide(), interval)
    }
  }

  startTimer () {
    let ticker = this.seconds
    ticker--
    const countDown = setInterval(() => this.timer.text(ticker--), 1000)
    setTimeout(() => {
      clearInterval(countDown)
      this.endGame()
    }, this.seconds * 1000)
  }

  async checkWord (evt) {
    evt.preventDefault()

    const word = $('#word', this.game).val()

    if (!word) {
      this.printMessage(`Error: You did not enter a word!`, 800)
      $('#word', this.game).val('').trigger('focus')
      return
    }
    
    if (this.wordList.has(word)) {
      this.printMessage(`Error: Word "${word}" has previously been found!`, 800)
      $('#word', this.game).val('').trigger('focus')
      return
    }

    const res = await axios.post('/check', { word: word })
    switch (res.data.result) {
      case 'not-word':
        this.printMessage(`Error: "${word}" is not a valid word`, 800)
        break
      case 'not-on-board':
        this.printMessage(`Error: "${word}" is not on this board`, 800)
        break
      case 'ok':
        this.wordList.add(word)
        this.printMessage(`Word "${word}" was found`, 800)
        $('#word-list').append(`<li>${word}</li>`)
        this.score += word.length
        $('#score', this.game).text(this.score)
        break
      default:
        break
    }
    $('#word', this.game).val('').trigger('focus')
  }

  async endGame () {
    $('#search', this.game).hide()
    const res = await axios.post("/score", { score: this.score })
    if (res.data.newHigh) {
      this.printMessage(`Congrats! New high score of ${this.score}`)
    } else {
      this.printMessage(`Final score: ${this.score}`)
    }
  }
}
