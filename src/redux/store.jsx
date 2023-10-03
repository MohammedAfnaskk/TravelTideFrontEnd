// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userSlice from './userSlice';


const persistConfig = {
    key: 'root',      
    storage,     
};
const persistedReducer = persistReducer(persistConfig, userSlice);

const store = configureStore({
    reducer: {
        user: persistedReducer, 
     },
});


const persistor = persistStore(store);


export { store, persistor };
