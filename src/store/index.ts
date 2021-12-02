import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// modules
import UserModule, { UserState } from './modules/user.module'
import AppModule, { AppState } from './modules/app.module'

Vue.use(Vuex)

interface StoreModule {
    app: AppState
    user: UserState
}

const store = new Vuex.Store<StoreModule>({
    modules: {
        app: AppModule,
        user: UserModule
    },
    plugins: [
        createPersistedState({
            key: 'vuex',
            storage: {
                getItem: key => uni.getStorageSync(key),
                setItem: (key, value) => uni.setStorageSync(key, value),
                removeItem: key => uni.removeStorageSync(key)
            },
            paths: ['user.token']
        })
    ]
})

export const useStore = () => store
