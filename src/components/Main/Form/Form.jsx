import React, { useState, useContext, useEffect } from 'react'
import {
  TextField,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core'
import useStyle from './styles'
import { ExpenTrakerContext } from '../../../Context'
import { v4 as uuidv4 } from 'uuid'
import {
  incomeCategories,
  expenseCategories,
} from '../../../constants/categorys'
import formateDate from '../../../utils/formateDate'

const initialState = {
  amount: '',
  category: '',
  type: 'Income',
  date: formateDate(new Date()),
}

const Form = () => {
  const classes = useStyle()
  const [formData, setFormData] = useState(initialState)
  const { addTransactions } = useContext(ExpenTrakerContext)
  const [open, setOpen] = useState(false)

  const createTransations = () => {
    if (Number.isNaN(Number(formData.amount)) || !formData.date.includes('-'))
      return

    if (incomeCategories.map((iC) => iC.type).includes(formData.category)) {
      setFormData({ ...formData, type: 'Income' })
    } else if (
      expenseCategories.map((iC) => iC.type).includes(formData.category)
    ) {
      setFormData({ ...formData, type: 'Expense' })
    }

    setOpen(true)
    addTransactions({
      ...formData,
      amount: Number(formData.amount),
      id: uuidv4(),
    })
    setFormData(initialState)
  }

  const selectedCategories =
    formData.type === 'Income' ? incomeCategories : expenseCategories
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography align="center" variant="subtitle2" gutterBottom>
            .......
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            >
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expense">Expense</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              {selectedCategories.map((c) => (
                <MenuItem key={c.type} value={c.type}>
                  {c.type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="number"
            label="Amount"
            fullWidth
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="date"
            label="date"
            fullWidth
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: formateDate(e.target.value) })
            }
          />
        </Grid>
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          fullWidth
          onClick={createTransations}
        >
          Create
        </Button>
      </Grid>
    </div>
  )
}

export default Form
