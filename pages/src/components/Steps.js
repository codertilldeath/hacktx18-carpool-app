import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { states } from './States.js';
import Radio from '@material-ui/core/Radio';
import RadioButtonsGroup from './Radio.js';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';


const styles = {
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    form: {
        marginRight: 30,
        marginLeft: 30,
        color: '#97c2b9',
    },
    wide: {
        width: 70,
    },
    tallspace: {
        marginTop: 40,
        marginBottom: 20,
        color:  '#324450',
    },
    bottomspace: {
        marginBottom: 40,
    },
    buttonspace: {
        marginTop: 20,
        marginBottom: 20,
        marginRight: 10,
        marginLeft: 10,
        backgroundColor: '#324450',
        color: 'white'
    },
    card: {
        height: '100vh',
        backgroundColor: '#97c2b9',
    },
};

export class Welcome extends Component {

    constructor(props) {
        super(props);
        this._onChange = this._onChange.bind(this);
    }

    _onChange = event => {
        this.setState({ value: event.target.value });
        console.log(event.target.value);
        this.props.saveForm({
            driver: event.target.value == 'driver'
        });
    };

    render() {
        return (
            <Card>
              <CardContent>
                <Typography variant="h1" component="h1" style={styles.tallspace}>
                  Hi, what's your...
                </Typography>
              </CardContent>
              <Grid container spacing={24}>
                <Grid item style={styles.form} xs={12}>
                  <FormGroup>
                    <TextField
                      id="name"
                      label="Name"
                      placeholder="Name"
                      multiline
                      margin="normal"
                    />
                  </FormGroup>
                </Grid>
                <Grid item style={styles.form} xs={12}>
                    <FormGroup>
                    <TextField
                        style={{color:'#97c2b9'}}
                        id="email"
                        label="Email"
                        placeholder="Email"
                        multiline
                        margin="normal"
                    />
                    </FormGroup>
                </Grid>
              </Grid>
              <Grid container justify="center">
                <CardActions>
                  <Button style={styles.buttonspace} primary onClick={() => this.props.next(states.PERSON_CHOOSE)} size="large">Next</Button>
                </CardActions>
              </Grid>
            </Card>
        );
    }
}

export class PersonChoose extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            errors: []
        };
        this._onChange = this._onChange.bind(this);
        this._validate = this._validate.bind(this);
        this._back = this._back.bind(this);
    }

    _onChange = event => {
        this.setState({ value: event.target.value });
        console.log(event.target.value);
        this.props.saveForm({
            driver: event.target.value == 'driver'
        });
    };


    _validate(e) {
        e.preventDefault();
        let value = this.state.value;
        console.log(value);
        if (value === 'driver') {
            this.props.next(states.CAR_DETAIL);
        } else if (value === 'rider') {
            this.props.next(states.RIDER);
        } else {
            this.setState({
                errors: ['Please choose driver or rider']
            });
        }
    }

    _back() {
        this.props.back(states.WELCOME);
    }

    render() {
        return (
            <Card style={styles.card}>

                <Grid container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center">
                    <FormControl component="fieldset" >
                        <Typography variant="h2" component="h2" style={styles.tallspace}>
                            Are you a...
                </Typography>
                        <RadioGroup
                            aria-label="persontype"
                            name="persontype"
                            value={this.state.value}
                            onChange={this._onChange}
                            style={styles.tallspace}
                        >
                            <FormControlLabel value="driver" control={<Radio />} label="Driver" />
                            <FormControlLabel value="rider" control={<Radio />} label="Rider" />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid>

                    <Button style={styles.buttonspace} secondary onClick={this._back}>Back</Button>

                    <Button style={styles.buttonspace} primary onClick={this._validate}>Next</Button>

                </Grid>
            </Card>
        );
    }
}

class BaseForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: this.props.type,
            address: null,
            errors: []
        };
        this._onChange = this._onChange.bind(this);
        this._validate = this._validate.bind(this);
        this._back = this._back.bind(this);
    }

    _onChange(e, { name, value }) {
        this.setState({
            [name]: value
        });
    }

    _validate(e) {
        e.preventDefault();
        // You can add your validation logic here

        this.props.saveForm({
            type: this.props.type,
            address: this.state.address,
        });

        this.props.next(this.props.nextState);
    }

    _back(e) {
        e.preventDefault();
        this.props.back(this.props.lastState);
    }

    render() {
        return (
            <Card style={styles.card}>
                <FormControl>
                    {/* {this.state.errors.length > 0 &&
                    <Message negative>
                        <p>{this.state.errors.join('. ')}</p>
                    </Message>
                } */}
                    <Typography variant="h2" component="h2" style={styles.tallspace}>
                        {this.props.type} details:
                </Typography>
                    <FormGroup widths='equal'>
                        <TextField
                            id="standard-textarea"
                            label="Address"
                            placeholder="Address"
                            multiline
                            margin="normal"
                        />
                    </FormGroup>
                    <Grid>

                        <Button style={styles.buttonstyle} secondary onClick={this._back}>Back</Button>
                        <Button style={styles.buttonstyle} primary onClick={this._validate}>Next</Button>

                    </Grid>
                </FormControl>
            </Card>
        );
    }
}

export const Driver = (props) => {
    return (
        <BaseForm
            type='Driver'
            next={props.next}
            back={props.back}
            saveForm={props.saveForm}
            nextState={states.CONFIRM}
            lastState={states.CAR_DETAIL} />
    );

}

export const Rider = (props) => {
    return (
        <BaseForm
            type='Rider'
            next={props.next}
            back={props.back}
            saveForm={props.saveForm}
            nextState={states.CONFIRM}
            lastState={states.PERSON_CHOOSE} />
    );
}

export class CarInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seats: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this._validate = this._validate.bind(this);
        this._back = this._back.bind(this);
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    _back() {
        this.props.back(states.PERSON_CHOOSE);
    }

    _validate(e) {
        // You can add validation logic here
        this.props.next(states.DRIVER);
        console.log(this);
    }

    render() {
        return (
            <Card style={styles.card}>
                < Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h2" component="h2" style={styles.tallspace}>
                            How many seats do you have available?
                </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl style={styles.wide}>
                        <InputLabel htmlFor="seats">Seats</InputLabel>
                        <Select
                            value={this.state.seats}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'seats',
                                id: 'seats',
                            }}
                            autoWidth
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12}

>

                        <Button style={styles.buttonspace} secondary onClick={this._back}>Back</Button>

                        <Button style={styles.buttonspace} primary onClick={this._validate}>Next</Button>

                    </Grid>
                </Grid>
            </Card>
        );
    }
}

export class Confirm extends React.Component {
    render() {
        /*
         * Here is our final step. In the real world, we would
         * obviously do something more complicated than a javascript
         * alert
         */
        return (
            <Card style={styles.card}>
                <Typography variant="h1" component="h1" style={styles.tallspace}>
                    Woohoo! Trip Saved!
                </Typography>
            </Card>
        );
    }
}
