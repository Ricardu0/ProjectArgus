import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './view/styles/index.css'
import './App.css'
import { AuthProvider } from "./controller/api/AuthContext"

import Usuario from './view/views/Usuario.jsx';
import Home from './view/views/Home.jsx';
import InitialPageAdm from "./view/views/InitialPageAdm";
import Cadastro from './view/components/Cadastro';
import Register from "./view/views/Register";
import MateriaAdm from "./view/views/MateriaAdm"
import TemaPage from "./view/components/TemaPage";
import SubtemaPage from "./view/components/SubtemaPage";
import ConteudoPage from "./view/components/ConteudoPage";
import TemaAdm from "./view/views/TemaAdm";
import SubtemaAdm from "./view/views/SubtemaAdm";
import SubtemaList from "./view/components/SubtemaList";
import ConteudoAdm from "./view/views/ConteudoAdm";
import ConteudoList from "./view/components/ConteudoList";
import Login from "./view/views/Login";
import HomePage from "./view/views/HomePage";
import Pomodore from "./view/components/Pomodore";
import GoalSetter from "./view/components/GoalSetter";
import Aibot from "./view/components/Aibot";
import ChatBot from "./view/views/Chatbot";
import InitialPage from "./view/views/InitialPage";
import Clock from "./view/views/Clock";
import Goal from "./view/views/Goal";



function App() {
  return (
      <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/usuarios" element={<Usuario />} />
            <Route path="/" element={<Home/>} />
            <Route path ="/inicio" element={<HomePage/>} />
            <Route path="/initialpage" element={<Home/>} />
            <Route path="/adm" element={<InitialPageAdm/>} />

          <Route path="/test" element={<SubtemaPage/>} />
          <Route path="/test2" element={<InitialPage/>} />
          <Route path="/test3" element={<ConteudoList/>} />
          <Route path="/test4" element={<SubtemaList/>} />
          <Route path="/temaAdm" element={<TemaAdm/>} />

            <Route path="/cadastro" element={<Cadastro/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/materiaAdm" element={<MateriaAdm/>} />
            <Route path="/subtemaAdm" element={<SubtemaAdm/>} />
            <Route path="/conteudoAdm" element={<ConteudoAdm/>} />
            <Route path="/Login" element={<Login/>} />
          <Route path="/Pomodoro" element={<Clock/>} />
          <Route path="/goalsetter" element={<Goal/>} />
          <Route path="/aibot" element={<ChatBot/>} />
            {/* você pode adicionar outras rotas aqui depois */}

            //tenho que criar uma pagina pro pomodoro e uma página pro goal setter
            //tenho que criar uma pagina para criar cada componente (feito)
            //tenho que criar a pagina de cadastro e login (fazer)
            //tenho que arrumar criptografia
            //uma ppagina pra landing page 
            //total de paginas: 7 páginas.
        </Routes>
      </BrowserRouter>
      </AuthProvider>
  );
}

export default App;
