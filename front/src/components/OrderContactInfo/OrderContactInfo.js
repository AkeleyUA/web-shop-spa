import React from 'react'
import { TextField, Button, Typography } from '@material-ui/core'
import { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { Autocomplete } from '@material-ui/lab'
import { cities } from '../../static/cities'

import './OrderContactInfo.scss'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setStepAction } from '../OrderSteps/action';

const OrderContactInfo = ({ setStep }) => {

  const filterOptions = createFilterOptions({
    matchFrom: 'start',
    stringify: option => option.city,
  });

  return (
    <form className="contact-form" autoComplete="off">
      <TextField fullWidth id="phone" name="phone" label="Номер телефона" variant="outlined" required />
      <TextField fullWidth id="name" name="name" label="Имя и фамилия" variant="outlined" required />
      <Autocomplete fullWidth
        id="city"
        options={cities.sort(item => item.city)}
        getOptionLabel={(option) => option.city}
        renderInput={(params) => <TextField {...params} label="Выберите город" variant="outlined" required />}
        renderOption={(item) => (
          <div>
            <Typography variant="body1">{item.city}</Typography>
            <Typography variant="caption">{item.area}</Typography>
          </div>
        )}
        filterOptions={filterOptions}
      />
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        variant="outlined"
        helperText="Если вы хотите следить за статусом выполнения заказа"
      />
      <Typography variant="caption">* обязательное поле</Typography>
      <Button variant="contained" color="primary" onClick={() => setStep(1)}>Продолжить</Button>
    </form>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    setStep: bindActionCreators(setStepAction, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(OrderContactInfo)