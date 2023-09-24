import { Routes, Route } from 'react-router-dom';
import UserHomePage from '../pages/UserUI/home/home';
  
function UserRoutes() {

  return (
    <Routes>
        <Route path='/' element={<UserHomePage />}/>
      </Routes>
  );
}

export default UserRoutes;
    