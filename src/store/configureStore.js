import { createStore, applyMiddleware, compose } from 'redux'
// import { autoRehydrate } from 'redux-persist'
// import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from '../reducers'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

const persistConfig = {
	key: 'root',
	storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default function configureStore(initialState) {
// 	const store = createStore(
// 		rootReducer,
// 		initialState,
// 		applyMiddleware(thunk, logger)
// 	)

	let store = createStore(persistedReducer, applyMiddleware(thunk, logger))
	let persistor = persistStore(store)

	if(module.hot) {
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers').default
			store.replaceReducer(nextRootReducer)
		})
	}
	
	// return store
	return { store, persistor }
}


// export default () => {
// 	let store = createStore(persistedReducer, applyMiddleware(thunk, logger))
// 	let persistor = persistStore(store)

// 	if(module.hot) {
// 		module.hot.accept('../reducers', () => {
// 			const nextRootReducer = require('../reducers').default
// 			store.replaceReducer(nextRootReducer)
// 		})
// 	}

// 	return { store, persistor }
// }