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
import { connect } from 'react-redux';

export const settingsList = [
  {
    name: 'Панель управления',
    path: '/admin/dashboard',
    icon: 'widgets',
    lvl: 0,
  },
  {
    name: 'Список товаров',
    path: '/admin/products',
    icon: 'view_list',
    lvl: 0,
  },
  {
    name: 'Список категорий',
    path: '/admin/categories',
    icon: 'category',
    lvl: 0,
  },
  {
    name: 'Редактор продуктов',
    path: '/admin/product/:id',
    icon: 'edit',
    lvl: 101,
  },
  {
    name: 'Права доступа',
    path: '/admin/access',
    icon: 'lock',
    lvl: 10,
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

const AdminSettingsList = ({ accessLevel }) => {
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
        {settingsList.filter(item => item.lvl < accessLevel).map((item) => {
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

const mapStateToProps = state => {
  return {
    accessLevel: state.authState.token.accessLevel
  }
}

export default connect(mapStateToProps, null)(AdminSettingsList)