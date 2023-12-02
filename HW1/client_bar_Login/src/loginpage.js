import React from 'react';
import { useNavigate } from 'react-router-dom';

function Loginpage() {
    const navigate = useNavigate();


    const homeNavigate = () => {
        navigate('/home');
    };
    return (

        <div className="Loginpage">
            <h1>App登入介面</h1>
            <button onClick={homeNavigate}>Log In</button>
        </div>
    );
}

export default Loginpage;
