
import '../css/body.css'
import { useState, useEffect } from 'react';
import { useTelegram } from "./Hooks/useTelegram";
import { Link } from "react-router-dom";

import UserProfile from './Telegram/UserProfile';

function Header({ userId }) {
  const { user } = useTelegram();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);  

  return (
    <>
      <nav className="nav-form">
                  
     <Link to={`/profile/`}>
      <div className="usercard">
        <div className="usercard_block">
          <UserProfile userId={userId} />
          <div className='usercard-info'>
            <div className='usercard-name'>
              <div className='usercard-navigation-name'>123123 12312312{user?.first_name}</div>
              <svg
                className="user_block_svg"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 8 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                  />
              </svg>
            </div>
          <div className='usercard-rank'>Starter</div>
          </div>
          
          
        </div>
        
      </div>
       </Link>
      
       <a href="https://t.me/zipper_store" target="_blank" rel="noopener noreferrer">
        <button className="btn_block" onClick={() => {}}>
          <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10Z"
              fill="currentColor"
            ></path>
            <path
              d="M3.507 10.426c1.174-.642 2.485-1.178 3.71-1.716a194.018 194.018 0 0 1 6.362-2.556c.415-.137 1.162-.272 1.236.34-.04.865-.205 1.726-.319 2.586-.287 1.892-.619 3.778-.943 5.663-.111.629-.905.954-1.412.552-1.22-.818-2.449-1.627-3.653-2.463-.394-.398-.028-.969.324-1.253 1.004-.982 2.07-1.816 3.022-2.85.257-.615-.502-.096-.752.063-1.376.94-2.717 1.938-4.167 2.764-.74.404-1.604.059-2.344-.167-.664-.273-1.637-.547-1.064-.963Z"
              fill="#fff"
            ></path>
          </svg>
          <div>
            @zipper_store
            <div className="btn_block_title">наш telegram-канал</div>
          </div>
        </button>
      </a>
      </nav>
    </>
  )
}

export default Header
