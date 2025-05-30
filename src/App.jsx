import './App.css';
import Header from './components/Header';
import Body from './components/Body';
import Contact from './components/Pages/Contact';
import About from './components/Pages/About';
import Cart from './components/Pages/Cart';
import Error from './components/Error';
import Login from './components/Pages/Login';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';
import RestaurantMenu from './components/RestaurantMenu';
// import {Provider} from 'react-redux';

const App = () => {

    return (
   <>
   <Header />
   <Outlet />
   </>
    );
};

const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '/',
                element: <Body/>
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/contact',
                element: <Contact/>
            },
            {
                path: '/cart',
                element: <Cart/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/restaurants/:resId',
                element: <RestaurantMenu/>
            }
        ],
        errorElement: <Error/>
    },
   
]);
export default App
export  {appRouter};

