import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

/*
	Roulette: https://github.com/Tumne/react-roulette-wheel
*/
class Roulette extends Component {

	static propTypes = {
		className: PropTypes.string,
		options: PropTypes.array,
		baseSize: PropTypes.number,
		spinAngleStart: PropTypes.number,
		spinTimeTotal: PropTypes.number,
		onComplete: PropTypes.func,
	};

	static defaultProps = {
		options:  [ ],
		baseSize: 275,
		spinAngleStart: Math.random() * 10 + 10,
		spinTimeTotal: Math.random() * 3 + 4 * 1000,
	};

	constructor(props) {
		super(props);
		this.state = {
			spinAngleStart: 0,
			startAngle: 0,
			spinTime: 0,
			arc: Math.PI / (props.options.length / 2),
			btnDisabled: false,
		};
		this.spinTimer = null;
		this.handleOnClick = this.handleOnClick.bind(this);
		this.spin = this.spin.bind(this);
		this.rotate = this.rotate.bind(this);
		this.btnRef = React.createRef();
	}

	componentDidMount() {
		this.drawRouletteWheel();
	}

	byte2Hex(n) {
		const nybHexString = '0123456789ABCDEF';
		return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
	}

	RGB2Color(r,g,b) {
		return '#' + this.byte2Hex(r) + this.byte2Hex(g) + this.byte2Hex(b);
	}

	getColor(item, maxitem) {
		const phase = 0;
		const center = 128;
		const width = 128;
		const frequency = Math.PI*2/maxitem;

		const red   = Math.sin(frequency*item+2+phase) * width + center;
		const green = Math.sin(frequency*item+0+phase) * width + center;
		const blue  = Math.sin(frequency*item+4+phase) * width + center;

		return this.RGB2Color(red,green,blue);
	}

	drawRouletteWheel() {
		const { options, baseSize } = this.props;
		let { startAngle, arc } = this.state;

		let ctx;

		const canvas = this.refs.canvas;
		if (canvas.getContext) {
			const outsideRadius = baseSize - 25;
			const textRadius = baseSize - 45;
			const insideRadius = baseSize - 55;

			ctx = canvas.getContext('2d');
			ctx.clearRect(0,0,600,600);

			ctx.strokeStyle = 'white';
			ctx.lineWidth = 2;

			ctx.font = '14px Helvetica, Arial';

			for(let i = 0; i < options.length; i++) {
				const angle = startAngle + i * arc;

				ctx.fillStyle = this.getColor(i, options.length);

				ctx.beginPath();
				ctx.arc(baseSize, baseSize, outsideRadius, angle, angle + arc, false);
				ctx.arc(baseSize, baseSize, insideRadius, angle + arc, angle, true);
				ctx.fill();

				ctx.save();
				ctx.fillStyle = 'white';
				ctx.translate(baseSize + Math.cos(angle + arc / 2) * textRadius,
					baseSize + Math.sin(angle + arc / 2) * textRadius);
				ctx.rotate(angle + arc / 2 + Math.PI / 2);
				const text = options[i];
				ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
				ctx.restore();
			}

			//Arrow
			ctx.fillStyle = 'red';
			ctx.beginPath();
			ctx.lineTo(baseSize + 10, baseSize - (outsideRadius + 20));
			ctx.lineTo(baseSize + 0, baseSize - (outsideRadius - 5));
			ctx.lineTo(baseSize - 10, baseSize - (outsideRadius + 20));
			ctx.fill();
			ctx.stroke();
		}
	}

	spin() {
		this.spinTimer = null;
		this.setState({ spinTime: 0}, () => this.rotate());
	}

	rotate(){
		const { spinAngleStart, spinTimeTotal } = this.props;
		if(this.state.spinTime > 2800) {
			clearTimeout(this.spinTimer);
			this.stopRotateWheel();
		} else {
			const spinAngle = spinAngleStart - this.easeOut(this.state.spinTime, 0, spinAngleStart, spinTimeTotal);
			this.setState({
				startAngle: this.state.startAngle + spinAngle * Math.PI / 180,
				spinTime: this.state.spinTime + 30,
			}, () => {
				this.drawRouletteWheel();
				clearTimeout(this.spinTimer);
				this.spinTimer = setTimeout(() => this.rotate(), 30);
			});
		}
	}

	stopRotateWheel() {
		let { startAngle, arc } = this.state;
		const { options, baseSize } = this.props;

		const canvas = this.refs.canvas;
		const ctx = canvas.getContext('2d');

		const degrees = startAngle * 180 / Math.PI + 90;
		const arcd = arc * 180 / Math.PI;
		const index = Math.floor((360 - degrees % 360) / arcd);
		ctx.save();
		ctx.font = 'bold 20px Helvetica, Arial';
		const text = options[index];
		ctx.fillText(text, baseSize - ctx.measureText(text).width / 2, baseSize / 3);
		ctx.restore();
		this.setState({ btnDisabled: false });
	}

	easeOut(t, b, c, d) {
		const ts = (t/=d)*t;
		const tc = ts*t;
		return b+c*(tc + -3*ts + 3*t);
	}

	handleOnClick() {
		this.setState({ btnDisabled: true });
		this.spin();
	}

	render() {
		const { baseSize, classes } = this.props;

		return (
			<div className={classes.roulette}>
				<h1 className={classes.rouletteContainer}>점심추천</h1>
				<div className={classes.rouletteContainer}>
					<canvas ref="canvas" width={baseSize * 2} height={baseSize * 2} className="roulette-canvas"></canvas>
				</div>
				<div className={classes.rouletteContainer}>
					<Button
						ref={this.btnRef}
						variant="raised"
						color="primary"
						disableRipple
						className={classes.bootstrapRoot}
						onClick={this.handleOnClick}
						disabled={this.state.btnDisabled}>
						돌리기
					</Button>
				</div>
			</div>
		);
	}
}

const styles = theme => ({
	roulette: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
	rouletteContainer: {
		display: 'flex',
		justifyContent: 'center',
		padding: '5px'
	},
	bootstrapRoot: {
		boxShadow: 'none',
		textTransform: 'none',
		borderRadius: 4,
		fontSize: 16,
		padding: '6px 12px',
		border: '1px solid',
		backgroundColor: '#007bff',
		borderColor: '#007bff',
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(','),
		'&:hover': {
			backgroundColor: '#0069d9',
			borderColor: '#0062cc',
		},
		'&:active': {
			boxShadow: 'none',
			backgroundColor: '#0062cc',
			borderColor: '#005cbf',
		},
		'&:focus': {
		 	boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
		},
	},
});

class Lunch extends Component {

	state = {
		lunchMenu: [
			'백스키친',
			'곰국시',
			'단뽀뽀',
			'부대찌개',
			'순대국',
			'쿠벤',
			'지오글',
			'닭칼국수',
			'김치찌개',
			'팔람카오'
		],
	};

	render() {
		const { classes } = this.props;
		return (
			<Roulette classes={classes} options={this.state.lunchMenu} baseSize={300} />
		);
	}
}

export default withStyles(styles)(Lunch);