import React, { useState } from 'react'
import PropTypes from 'prop-types'

// material
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

// castom hooks
import { useFormState } from 'react-use-form-state'
//----------------------------------------

function Alert(properties) {
	return <MuiAlert elevation={6} variant='filled' {...properties} />
}

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
	inputBox: {
		display: 'flex',
		flexDirection: 'column',
		justifyItems: 'center',
		alignItems: 'center',
	},
	formBox: {
		flexDirection: 'column',
		display: 'flex',
		fontSize: '2rem',
		'& input': {
			outline: 'none',
			width: '80%',
			margin: '1rem 0',
			border: propertiesStyle => {
				if (propertiesStyle.isChecked) {
					return `2px solid ${propertiesStyle.isErrors ? 'red' : 'green'}`
				}
				return 'none'
			},
			borderRadius: 5,
			padding: '2px 4px',
		},
		'& label': { color: '#fff' },
	},
}))

const Form = ({ data, setIsOpenPrompt, currentArray }) => {
	const [formState, { label, text }] = useFormState()
	const [isErrors, setIsErrors] = useState(false)
	const [isChecked, setIsChecked] = useState(false)
	const [open, setOpen] = useState(false)
	const propertiesStyle = {
		isErrors,
		isChecked,
	}
	const classes = useStyles(propertiesStyle)
	const handleClose = reason => {
		if (reason === 'clickaway') {
			return
		}

		setOpen(false)
	}
	const handleChange = () => {
		setIsChecked(false)
		setIsErrors(false)
		setOpen(false)
	}

	function handleSubmit(e) {
		e.preventDefault()
		setOpen(true)
		setIsChecked(true)
		if (formState.values.word === data.word) {
			setIsErrors(false)
			setIsOpenPrompt(true)
			currentArray.push(1)
		} else {
			//!		currentArray
			currentArray.push(2)
			setIsErrors(true)
		}
		if (currentArray.lenght === 10) {
			alert(10)
		}
		e.target.blur()
		console.log(currentArray)
	}

	return (
		<form onSubmit={handleSubmit} className={classes.formBox}>
			<div className={classes.inputBox}>
				<label {...label('word')}>your answer</label>
				<input
					{...text({
						name: 'word',
						onChange: e => handleChange(e),
					})}
					required
				/>
			</div>
			<Button type='submit' variant='contained' color='secondary'>
				Check
			</Button>
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}>
				<Alert onClose={handleClose} severity={isErrors ? 'error' : 'success'}>
					{isErrors && isChecked ? 'error' : 'O_o'}
				</Alert>
			</Snackbar>
		</form>
	)
}

Form.propTypes = {
	data: PropTypes.object,
	setIsOpenPrompt: PropTypes.func,
	currentArray: PropTypes.array,
}

export default Form
