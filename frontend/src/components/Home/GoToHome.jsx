import React from 'react'
import { useNavigate } from 'react-router-dom'

const GoToHome = () => {
    const navigate = useNavigate();
    const handleHomeButton = async()=>{
        navigate("/");
    }
  return (
    <div>
        <button onClick={handleHomeButton}>Home</button>
    </div>
  )
}

export default GoToHome;