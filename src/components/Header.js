import './header.css';
import { useState } from 'react';

const Header = (props) => {
  let [time, setTime] = useState('week');
  let [type, setType] = useState('movie');

  return (
    <div>
      <div className="header">
        <div>
          <select
            value={time}
            className="watchLaterBtn"
            onChange={(e) => {
              console.log(e.target.value);
              setTime(e.target.value);
            }}
          >
            <option value="day"> 今日 </option>
            <option value="week"> 本週 </option>
          </select>
          <div style={{ marginLeft: '10px', display: 'inline' }}></div>
          <select
            value={type}
            className="watchLaterBtn"
            onChange={(e) => {
              console.log(e.target.value);
              setType(e.target.value);
            }}
          >
            <option value="movie"> 電影 </option>
            <option value="tv"> 影集 </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Header;
