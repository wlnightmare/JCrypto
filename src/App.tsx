
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { NavBar } from './components/NavBar';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import News from './pages/News';
import Exchange from './pages/Exchange';
import Crypto from './pages/Crypto';


const App =()=>{
  return(
    <div className="app">
    <Box sx={{ flexGrow: 1 }}>
      <Grid container style={{ height: 900 }} spacing={2}>
        <NavBar/>
    
        <Grid item xs={8}>
          <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/news" element={<News/>}></Route>
        <Route path="/exchange" element={<Exchange/>}></Route>
        <Route path="/crypto" element={<Crypto/>}></Route>
          </Routes>
        </Grid>
  
      </Grid>
    </Box>

    </div>
  )
}

export default App;
