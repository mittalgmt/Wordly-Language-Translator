import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeContainer from '../src/components/HomeContainer';

const route = createBrowserRouter([
  {
    path: "/",
    element: <HomeContainer />,
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={route} />
    </div>
  );
}

export default App;