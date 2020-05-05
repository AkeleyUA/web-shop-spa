import { rootReducer } from '../reducers/rootReducer'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from '../sagas/rootSaga'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagasMiddleware = createSagaMiddleware()


const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(sagasMiddleware))
)

sagasMiddleware.run(rootSaga)

export default store
