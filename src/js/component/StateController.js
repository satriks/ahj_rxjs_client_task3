import StatsWidget from "../widget/statsWidget/StatsWidget"
import TasksWidget from "../widget/tasksWidget/TasksWidget"
import { map, fromEvent, Subject, share, filter, startWith} from 'rxjs'

export default class StateController {
    constructor(data){
        this.data = data
        this.activeProject = null
        this.stats = null
        this.tasks = null
        this.actions$ = new Subject();
        this.state$ = this.actions$.asObservable()
        .pipe(
            startWith({type: 'init', change : 0}),
            share()
            )
       

        this.state$.subscribe((changeData) => {
            const {type, change} = changeData
            if (type === 'project') {
                this.tasks.clear()
                this.tasks = new TasksWidget(this.data, change)
                this.listeners()
            }
            if (type === 'task') {

                this.stats.clear()
                this.stats = new StatsWidget(this.data)
                this.activeProject = this.tasks.activeProject
                this.tasks.clear()
                this.tasks = new TasksWidget(this.data, this.activeProject)
                this.listeners()
            }
            if (type === 'init') {
                console.log('init widgets');
                this.stats = new StatsWidget(this.data)
                this.tasks = new TasksWidget(this.data, this.data[0].name)  
                this.listeners()
            }
        })

    }
    listeners(){
        const project$ = fromEvent(this.tasks.selectProject, 'change')
        .pipe(map((value) => value.target.value))
        .subscribe(activeProject => {
            this.dispatch({type :'project', change: activeProject})

        })

        const tasks$ = fromEvent(this.tasks.tasksWidget, 'change')
        .pipe(
            filter((value) => value.target.className.includes('custom-checkbox')),
        )
        .subscribe((value) => {
            const taskName = value.target.nextElementSibling.textContent
            const status = value.target.checked
            this.data.find(el => el.name === this.tasks.activeProject).tasks.find(el => el.name === taskName).done = status
            this.dispatch({type:'task', change:'change'})
        })
    }

    dispatch(changeData) {
        this.actions$.next(changeData);
      }
}


