export default class TasksWidget {
  constructor (projects, activeProject) {
    this.activeProject = activeProject
    this.tasksWidget = null
    this.selectProject = null
    this.createDom(projects)
  }

  createDom (projects) {
    const tasksWrapper = document.createElement('div')
    tasksWrapper.classList.add('tasks__wrapper')

    const tasksTitle = document.createElement('label')
    tasksTitle.textContent = 'Tasks'

    const tasksHeader = document.createElement('div')
    tasksHeader.classList.add('tasks__header')

    const headerText1 = document.createElement('span')
    headerText1.textContent = 'Projects:'

    const selectProject = document.createElement('select')
    for (const project of projects) {
      const option = document.createElement('option')
      option.value = project.name
      option.textContent = project.name
      if (project.name === this.activeProject) option.selected = true
      selectProject.append(option)
    }

    tasksHeader.append(headerText1, selectProject)
    tasksWrapper.append(tasksTitle, tasksHeader)

    this.tasksWidget = tasksWrapper
    this.selectProject = selectProject
    document.querySelector('main').appendChild(tasksWrapper)

    const project = projects.find(project => project.name === this.activeProject)
    for (const task of project.tasks) {
      const taskDom = document.createElement('div')
      taskDom.classList.add('task')

      const inputTask = document.createElement('input')
      inputTask.type = 'checkbox'
      inputTask.id = task.name.split(' ').join('-')
      inputTask.name = task.name.split(' ').join('-')
      inputTask.className = 'custom-checkbox'
      if (task.done === true) inputTask.checked = true

      const taskName = document.createElement('label')
      taskName.className = 'task__name'
      taskName.setAttribute('for', task.name.split(' ').join('-'))
      taskName.textContent = task.name

      taskDom.append(inputTask, taskName)
      this.tasksWidget.appendChild(taskDom)
    }
  }

  clear () {
    this.tasksWidget.remove()
  }
}
