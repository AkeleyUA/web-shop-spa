import React, { useState } from 'react'
import { Rating } from '@material-ui/lab'
import { Box, Typography} from '@material-ui/core'
import { useSnackbar } from 'notistack'


export const RatingButton = ({id}) => {
  const [ratingValue, setRatinValue] = useState(0)
  const { enqueueSnackbar } = useSnackbar()

  const ratingHandler = (event, newValue) => {
    console.log(newValue)
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
    <Box component="div">
      <Typography component="legend" variant="caption">Оценка: {ratingValue}</Typography>
      <Rating
        name={id}
        value={ratingValue}
        onChange={ratingHandler}
      />
    </Box>
  )
}