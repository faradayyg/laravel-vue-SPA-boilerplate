import HomePage from './pages/Home.vue';
import Login from './pages/Login.vue';
import ProtectedPage from './pages/ProtectedPage.vue';

//pass extra info to the routes using the meta key

const routes = [
	{
		path : '/',
		component : HomePage,
		meta: {
			requiresAuth : false
		}
	},
	{
		path : '/login',
		component : Login,
		meta: {
			requiresAuth : false
		}
	},
	{
		path: '/protected', 
		component: ProtectedPage,
		meta: {
			requiresAuth: true
		}
	}
]

export default routes;