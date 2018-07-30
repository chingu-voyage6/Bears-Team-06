import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';


class Goals extends Component {
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

    onSubmit(values) {
        console.log(values);
    }


    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Type in your goal"
                    name="goal"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/home" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    console.log(values);
    const errors = {};

    if (!values.goal || values.goal.length < 3) {
        errors.goal = "enter goal";
    }
    return errors;

}

export default reduxForm({
    validate,
    form: 'GoalsForm'
})(Goals);



