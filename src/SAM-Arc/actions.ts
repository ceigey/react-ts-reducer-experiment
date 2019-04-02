import { createActions} from 'redux-arc'
import { Dog } from '../Models/Dog'

const { types, creators } = createActions('myActions', {
  increment: null,
  incrementBy: null as {
    payload: { amt: number }
  },
  setGreeting: null as {
    payload: { greeting: string }
  },
  setUsername: null as {
    payload: { name: string }
  },
  setUsertitle: null as {
    payload: { title: string }
  },
  setDogs: null as {
    payload: { dogs: Array<Dog> }
  },
  banana: null,
})

const aKey = creators.incrementBy({ amt: 1 })
const bKey = creators.increment({})