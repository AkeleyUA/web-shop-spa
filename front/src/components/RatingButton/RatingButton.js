import React, { useState } from 'react'
import { Rating } from '@material-ui/lab'
import { Box, Typography} from '@material-ui/core'
import { useSnackbar } from 'notistack'

import './RatingButton.scss'

export const RatingButton = ({id}) => {
  const [ratingValue, setRatinValue] = useState(0)
  const { enqueueSnackbar } = useSnackbar()

  const ratingHandler = (event, newValue) => {
    setRatinValue(+newValue)
    if(+newValue === 0) {
      enqueueSnackbar('Оценка удалена')
    } else if (ratingValue !== +newValue && ratingValue !== 0) {
      enqueueSnackbar('Оценка изменена')
    } else {
      enqueueSnackbar('Спасибо за оценку')
    }
  }

  return (
    <Box component="div" className="ratingBtn">
      <Rating
        size="small"
        name={id}
        value={ratingValue}
        onChange={ratingHandler}
      />
      <Typography component="legend" variant="caption">&nbsp;Отзывов: {ratingValue}</Typography>
    </Box>
  )
}