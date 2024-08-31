import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomeScreen from './Components/WelcomeScreen/WelcomeScreen';
import FormCreationScreen from './Components/FormCreation/FormCreationScreen';
import FormEditScreen from './Components/FormEdit/FormEditScree';
import FormView from './Components/FormView/FormView';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/create-form" element={<FormCreationScreen />} />
        <Route path="/forms/:id" element={<FormView/>} />
        <Route path="/edit-form/:id" element={<FormEditScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
