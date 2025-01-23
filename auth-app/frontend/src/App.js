import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Main from './pages/Main/Main'
const Layout = () =>{
  return (
    <>  <Main/>   </>
    )
  }
  const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
    
    ],
  },
  {  
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  
]);
function App() {
return (
    <div>
    <RouterProvider router={router}/>
    </div>
  );
}
export default App;
