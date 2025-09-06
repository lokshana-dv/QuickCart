import React from 'react'
import { NavLink } from 'react-router-dom';

import './LinkWithIcon.css'
const LinkWithIcon = ({title, link, emoji, sidebar}) => {
  return (
    <div>
      <NavLink to ={link}
       className={sidebar ? 'align_center sidebar_link' : 'align_center'} > {title} <img src={emoji} alt ={title || 'icon'} className= "link_emoji"/></NavLink>
    </div>
  )
}

export default LinkWithIcon
