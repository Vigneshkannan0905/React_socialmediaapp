import { useContext } from 'react'
import {FaLaptop,FaTabletAlt,FaMobileAlt} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import DataContext from './context/DataContext'

const Header = ({title}) => {
  const {width} = useContext(DataContext)
  return (
    <header className='Header'>
        <h1><Link to='/'>{title}</Link></h1>
        {width<768 ? <FaTabletAlt/>
          : width<992 ? <FaMobileAlt/>
            : <FaLaptop/>}
    </header>
  )
}

export default Header