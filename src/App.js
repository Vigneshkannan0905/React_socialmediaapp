import { Route, Routes } from 'react-router-dom'
import About from './About'
import Footer from './Footer'
import Header from './Header'
import Home from './Home'
import Missing from './Missing'
import Nav from './Nav'
import NewPost from './NewPost'
import PostPage from './PostPage'
import EditPost from './EditPost'
import { DataProvider } from './context/DataContext'
 
function App() {
  return (
    <div className="App">
      <DataProvider>
        <Header 
          title={'Vikipedia'}
        />
        <Nav/>
        
        <Routes>
          <Route path='/' element={
            <Home />}   />
          <Route path='post'>
              <Route index element ={<NewPost />}/>
              <Route path=":id" element={
                <PostPage/>}/>
          </Route>
          <Route path='/edit/:id' element ={ 
            <EditPost/>
          }>

          </Route>
          <Route path='about' element={<About/>}/>
          <Route path='*' element={<Missing/>}/>
        </Routes>
        <Footer/>
      </DataProvider>
    </div>
  );
}

export default App;
