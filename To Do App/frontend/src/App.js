import React from 'react';
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Todo from './components/Todo';


function App() {
  return (
   <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Todo />} />
       
      </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
