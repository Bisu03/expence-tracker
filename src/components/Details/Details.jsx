import React from 'react'
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core'
import { Doughnut } from 'react-chartjs-2'
import useStyles from './styles'
import useTransactions from '../../useTransactions'

const Details = ({ title, subheader }) => {
  const classes = useStyles()
  const { total, chartData } = useTransactions(title)
  console.log(JSON.stringify(chartData));
  return (
    <div>
      <Card className={title === 'Income' ? classes.income : classes.expense}>
        <CardHeader title={title} subheader={subheader} />
        <CardContent>
          <Typography variant="h5">${total}</Typography>
          <Doughnut data={chartData} />
        </CardContent>
      </Card>
    </div>
  )
}

export default Details
