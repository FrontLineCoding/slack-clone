
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const dispatch = useDispatch();
  const channels = useSelector(state => state.channels)
  const currentWorksapce = useSelector(state => state.currentWorksapce)

  return (
    <main>
      <nav>
        {channels.map((channel) => {
          return (
            <NavLink key={channel.id} to={`/${currentWorksapce}/${channel.name}`}>

            </NavLink>
          )
        })}
      </nav>
    </main>
  );
}

export default NavBar;
