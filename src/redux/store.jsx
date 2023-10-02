// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import UserSlice from './userSlice';


const persistConfig = {
    key: 'root',      
    storage,     
};
const persistedReducer = persistReducer(persistConfig, UserSlice);

const Store = configureStore({
    reducer: {
        user: persistedReducer,
     },
});


const persistor = persistStore(Store);


export default { Store, persistor };
