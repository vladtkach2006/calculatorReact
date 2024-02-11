import classes from './App.module.sass'
import { useState } from 'react'

export default function App() {
	const [operand1, setOperand1] = useState('')
	const [operator, setOperator] = useState('')
	const [operand2, setOperand2] = useState('')
	const [isResult, setIsResult] = useState(false)

	const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0]
	const operations = ['C', '-', '+', '=']

	function handleNumberClick(num) {
		setIsResult(false)
		const numberStr = String(num)
		if (numberStr === '0' && operand1 === '0') return
		if (!operator) {
			setOperand1(operand1 + numberStr)
		} else if (operator) {
			setOperand2(operand2 + numberStr)
		}
	}

	function handleOperationClick(operation) {
		switch (operation) {
			case 'C':
				setOperand1('')
				setOperand2('')
				setOperator('')
				setIsResult(false)
				break
			case '+':
				setOperator('+')
				setIsResult(false)
				break
			case '-':
				setOperator('-')
				setIsResult(false)
				break
			case '=':
				if (operand1 && operator && operand2) {
					setOperand1(
						operator === '+'
							? `${Number(operand1) + Number(operand2)}`
							: `${Number(operand1) - Number(operand2)}`
					)
					setOperand2('')
					setOperator('')
					setIsResult(true)
				}
				break
			default:
				break
		}
	}

	return (
		<div className={classes.calculator}>
			<div
				className={`${classes.displayResult} ${
					isResult ? classes.isResult : null
				}`}
			>
				{operand1 + operator + operand2}
			</div>
			<div className={classes.button}>
				<div className={classes.numbers}>
					{nums.map(num => (
						<button
							className={classes.number}
							onClick={() => handleNumberClick(num)}
							key={num}
						>
							{num}
						</button>
					))}
				</div>
				<div className={classes.operations}>
					{operations.map(operation => (
						<button
							className={classes.operationsBtn}
							onClick={() => handleOperationClick(operation)}
							key={operation}
						>
							{operation}
						</button>
					))}
				</div>
			</div>
		</div>
	)
}
