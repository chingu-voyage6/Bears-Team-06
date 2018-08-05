import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createGoal } from 'modules/user';
import styled from 'styled-components';


class Goals extends Component {
    constructor(props) {
        super(props)

        this.state = {
            number: 0
        }
    }

    renderField(field) {
        return (
            <div className="form-group">
                <label>{field.label}</label>
                <input
                  type="text"
                  {...field.input}
                />
                {field.meta.touched ? field.meta.error : ''}
            </div>
        );

    }

    onClick(event, numberOfDay) {
        event.preventDefault()
        this.setState({ number: numberOfDay})
    }

    onSubmit(values) {
        // Call the action
        this.props.createGoal(values.goal, this.state.number)
    }


    render() {
        const { handleSubmit } = this.props;

        return (
            <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Type in your goal"
                    name="goal"
                    component={this.renderField}
                />
                <WrapContainer>                
                <Container>
                    <p>Pick your choice</p>
                                   
                    <button style={divStyle} onClick={(e) => this.onClick(e,21)}>21 days</button>
                    <button onClick={(e) => this.onClick(e,100)}>100 days</button>
                    <button style={divStyle} type="submit">Submit</button>
                    <Link to="/home"><button type="button">Cancel</button></Link>
                                   
                </Container>
                </WrapContainer>
            </Form>
        );
    }
}

function validate(values) {    
    const errors = {};

    if (!values.goal || values.goal.length < 3) {
        errors.goal = "enter goal";
    }
    return errors;

}

export default reduxForm({
    validate,
    form: 'GoalsForm'
})(
    connect(null, { createGoal })(Goals)
);


//Style
const Form = styled.form`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10%;
  border: 2px solid grey;
  margin-left: 30%;
  padding-top: 10%;
`;

const WrapContainer = styled.div`
    margin: 10%;
    padding: 30px;
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const divStyle = {    
    margin: '8%',
    padding: '2%'
  };










