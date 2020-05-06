import React from 'react'
import { Link, useRouteMatch, useLocation } from 'react-router-dom'

import {
  Button,
  ListItem,
  Divider,
  ListItemText,
  ListItemIcon,
  Icon,
  List,
  Drawer,
  Grid,
  Typography
} from "@material-ui/core";

import './AdminSettingsList.scss'

export const settingsList = [
  {
    name: 'Панель управления',
    path: '/admin/dashboard',
    icon: 'widgets'
  },
  {
    name: 'Список товаров',
    path: '/admin/products',
    icon: 'view_list'
  },
  {
    name: 'Список категорий',
    path: '/admin/categories',
    icon: 'category'
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

const CustomButton = ({ to, label, activeOnlyWhenExact, icon }) => {
  const math = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact
  })

  return (
    <Link to={to} className="admin-drawer-link">
      <ListItem
        component={Button}
        variant="contained"
        classes={classes.listItem}
        selected={math ? math.isExact : false}
      >
        <ListItemIcon
          classes={classes.listIcon}
        >
          <Icon>{icon}</Icon>
        </ListItemIcon>
        <ListItemText>
          <Typography variant="caption">
            {label}
          </Typography>
        </ListItemText>
      </ListItem>
    </Link>
  )
}

export const AdminSettingsList = () => {
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
        {settingsList.map((item) => {
          return (
            <CustomButton
              key={item.name}
              to={item.path}
              label={item.name}
              activeOnlyWhenExact
              icon={item.icon} />
          )
        })}
      </List>
      <Link to='/developer' className="to-developer admin-drawer-link">
        <ListItem
          component={Button}
          variant="contained"
          classes={classes.listItem}
          selected
        >
          <ListItemIcon
            classes={classes.listIcon}
          >
            <Icon>code</Icon>
          </ListItemIcon>
          <ListItemText>
            <Typography variant="caption">
              Разработчик
              </Typography>
          </ListItemText>
        </ListItem>
      </Link >
    </Drawer>
  )
}