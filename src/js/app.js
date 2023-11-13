import db from '../db/db.json'
import StateController from './component/StateController'

const data = db.projects
const control = new StateController(data) // eslint-disable-line
