import React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm } from "redux-form";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { auth } from '../actions/userActions';

const validate = values => {
  const errors = {};
  console.log(values);
  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.password) {
    errors.username = 'Required';
  }

  return errors;
}

const renderTextfield = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
    <TextField
      hinttext={label}
      floatinglabeltext={label}
      label={label}
      {...input}
      {...custom}
      variant="filled"
    />
  )

const AuthFormComponent = (props) => {

  const useSignInTFStyles = makeStyles((theme) => ({
    root: {
      '&:focused': {
        color: 'green',
      },
      '&:after': {
        borderBottomColor: 'green',
      },
      width: "400px"
    }
  }));

  const StyleSignInBtn = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
      width: 400
    }
  }))(Button);

  const textFieldClasses = useSignInTFStyles();
  return (
    <div className="login-container center">
      <h1 className="sign-in-title">Sign In</h1>
      <form onSubmit={props.handleSubmit} className="center" name="signin">
        <div className="login-input">
          <Field name="username" component={renderTextfield} label="User Name" InputProps={{ classes: textFieldClasses }} />
        </div>
        <div className="login-input">
          <Field name="password" component={renderTextfield} label="Password" InputProps={{ classes: textFieldClasses }} />
        </div>
        <div className="sign-in-btn">
          <StyleSignInBtn variant="contained" color="primary" disabled={props.pristine || props.submitting}>Sign In</StyleSignInBtn>
        </div>
      </form>
    </div>
  )
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const username = evt.target.username.value
      const password = evt.target.password.value
      dispatch(auth(username, password))
    }
  }
}

const AuthForm = connect(null, mapDispatch)(AuthFormComponent)
export default reduxForm({ form: 'AuthForm', validate })(AuthForm);
