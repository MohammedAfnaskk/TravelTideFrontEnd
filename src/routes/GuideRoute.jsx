import { Routes, Route } from 'react-router-dom';
import GuideHomePage from '../pages/GuideUI/home/home';
  
function GuideRoutes() {

  return (
    <Routes>
        <Route path='/' element={<GuideHomePage />} />
      </Routes>
  );
}

export default GuideRoutes;
