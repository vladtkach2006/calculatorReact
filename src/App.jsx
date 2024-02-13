import classes from './App.module.sass'
import { useState } from 'react'

export default function App() {
	const [operand1, setOperand1] = useState('')
	const [operator, setOperator] = useState('')
	const [operand2, setOperand2] = useState('')
	const [isResult, setIsResult] = useState(false)

	const elements = [
		{ type: 'num', value: 7 },
		{ type: 'num', value: 8 },
		{ type: 'num', value: 9 },
		{ type: 'num', value: 4 },
		{ type: 'num', value: 5 },
		{ type: 'num', value: 6 },
		{ type: 'num', value: 1 },
		{ type: 'num', value: 2 },
		{ type: 'num', value: 3 },
		{ type: 'num', value: 0 },
		{ type: 'operator', value: 'C' },
		{ type: 'operator', value: '-' },
		{ type: 'operator', value: '+' },
		{ type: 'operator', value: '=' }
	]

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
					{elements.map(({ type, value }) => {
						if (type === 'num') {
							return (
								<button
									className={classes.number}
									onClick={() => handleNumberClick(Number(value))}
									key={value}
								>
									{value}
								</button>
							)
						}
					})}
				</div>
				<div className={classes.operations}>
					{elements.map(({ type, value }) => {
						if (type === 'operator') {
							return (
								<button
									className={classes.operationsBtn}
									onClick={() => handleOperationClick(value)}
									key={value}
								>
									{value}
								</button>
							)
						}
					})}
				</div>
			</div>
		</div>
	)
}
