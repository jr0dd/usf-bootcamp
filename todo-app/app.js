const form = document.querySelector('form')
const taskList = document.querySelector('#task-list')
const tasks = JSON.parse(localStorage.getItem('tasks')) || []

for (const task of tasks) {
  const newLi = document.createElement('li')
  newLi.innerText = task.taskName
  const completeBtn = document.createElement('button')
  const removeBtn = document.createElement('button')
  completeBtn.innerText = 'complete'
  removeBtn.innerText = 'remove'

  if (task.complete) {
    newLi.style.textDecoration = 'line-through'
  }

  newLi.append(completeBtn, removeBtn)
  taskList.append(newLi)
}

form.addEventListener('submit', (event) => {
  event.preventDefault()

  const newLi = document.createElement('li')
  const completeBtn = document.createElement('button')
  const removeBtn = document.createElement('button')
  completeBtn.innerText = 'complete'
  removeBtn.innerText = 'remove'
  const task = document.querySelector('#task').value

  newLi.innerText = task
  newLi.append(completeBtn, removeBtn)
  taskList.append(newLi)
  form.reset()

  tasks.push({ taskName: task, complete: false })
  localStorage.setItem('tasks', JSON.stringify(tasks))
})

taskList.addEventListener('click', (event) => {
  const el = event.target
  const li = el.parentElement
  const clicked = li.childNodes[0].nodeValue.trim()
  if (el.innerText === 'complete') {
    for (const task of tasks) {
      if (task.taskName === clicked) {
        if (li.style.textDecoration === 'line-through') {
          li.style.textDecoration = ''
          task.complete = false
        } else {
          li.style.textDecoration = 'line-through'
          task.complete = true
        }
      }
    }
    
  } else {
    if (el.innerText === 'remove') {
      li.remove()
      const index = tasks.findIndex(task => task.taskName === clicked)
      tasks.splice(index,1)
    }
  }
  localStorage.setItem('tasks', JSON.stringify(tasks))
})
