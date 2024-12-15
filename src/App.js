import logo from './logo.svg';
import './App.css';
import Todolist from './componets/Todolist';
import { v4 as uuidv4 } from 'uuid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TodosContext } from './Contextes/TodosContext';
import { useState } from 'react';
import { ToastProvider } from './Contextes/ToastContext';
const theme = createTheme({
  typography: {},
  palette: {
    primary: {
      main: "#004d40"
    }
  }
});

const intaileodo = [
  {
    id: uuidv4(),
    title: "المهمه الاول",
    detailes: "kkkkk",
    iscompleted: false
  }
];

function App() {
  const [todos, settodos] = useState(intaileodo);


 
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider >
      <div className="App" style={{ direction: "rtl", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>

        <TodosContext.Provider value={{  todos , settodos }}>
          <Todolist />
        </TodosContext.Provider>
      </div>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
