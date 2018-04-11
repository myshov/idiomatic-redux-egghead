import React from 'react';
import {NavLink} from 'react-router-dom';


const FilterLInk = ({filter, children}) => (
    <NavLink
        exact
        to={filter === 'all' ? '/' : `/${filter}`}
        activeStyle={{
            textDecoration: 'none',
            color: 'black',
        }}
    >
        {children}
    </NavLink>
)

export default FilterLInk;
