import React from 'react'
import { Link, matchPath, NavLink, useLocation } from 'react-router-dom'

import {
  ListItem,
  Divider,
  ListItemText,
  ListItemIcon,
  Icon,
  List,
  Drawer,
  Typography
} from "@material-ui/core";

import './AdminSettingsList.scss'

export const settingsList = [
  {
    name: 'Панель управления',
    path: '/admin/dashboard',
    icon: 'widgets',
    nav: true,
  },
  {
    name: 'Список товаров',
    path: '/admin/products',
    icon: 'view_list',
    nav: true,
  },
  {
    name: 'Список категорий',
    path: '/admin/categories',
    icon: 'category',
    nav: true,
  },
  {
    name: 'Редактор продуктов',
    path: '/admin/product/:id',
    icon: 'edit',
    nav: false,
  }
]

const classes = {
  listItem: {
    root: 'drawer-btn',
    selected: 'drawer-btn-selected'
  },
  listIcon: {
    root: 'drawen-icon'
  },
  divider: {
    root: "divider"
  }
}

export const AdminSettingsList = () => {
  const location = useLocation()
  const findName = settingsList.find(item => matchPath(location.pathname, item.path))

  return (
    <Drawer
      open
      variant="permanent"
      className="drawer-container"
      classes={{
        paper: 'drawer-bg'
      }}
      elevation={16}
    >
      <List>
        <Link to='/admin/dashboard' className="to-home">
          <ListItem
            classes={classes.listItem}
          >
            <ListItemText>
              <Typography variant="h4">
                LOGOtip&nbsp;
                  <Typography variant="caption">
                  aдмин
                  </Typography>
              </Typography>
            </ListItemText>
          </ListItem>
        </Link >
        <Divider
          variant="middle"
          light
          classes={classes.divider}
        />
        {settingsList.filter(item => item.nav).map((item) => {
          return (
            <ListItem
              className={findName && findName.path === item.path ? "drawer-btn-selected drawer-btn" : "drawer-btn"}
              key={item.path}
              component={NavLink}
              to={item.path}
              variant="contained"
              classes={classes.listItem}
            >
              <ListItemIcon
                classes={classes.listIcon}
              >
                <Icon fontSize="small">{item.icon}</Icon>
              </ListItemIcon>
              <ListItemText>
                <Typography variant="caption">
                  {item.name}
                </Typography>
              </ListItemText>
            </ListItem>
          )
        })}
      </List>
      <ListItem
        component={NavLink}
        variant="contained"
        to='/developer'
        className="to-developer drawer-btn-selected drawer-btn">
        <ListItemIcon
          classes={classes.listIcon}
        >
          <Icon fontSize="small">code</Icon>
        </ListItemIcon>
        <ListItemText>
          <Typography variant="caption">
            Разработчик
          </Typography>
        </ListItemText>
      </ListItem>
    </Drawer>
  )
}