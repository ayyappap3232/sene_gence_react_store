import React, { useState, useContext } from 'react'
import { Container, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import SessionContext from 'react-storefront/session/SessionContext'
import get from 'lodash/get'

const useStyles = makeStyles(theme => ({
  root: {
    border: `1px solid ${theme.palette.divider}`,
    minHeight: 100,
    padding: 10,
    position: 'relative',
  },
  spacingBlock: {
    margin: 10,
  },
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
}))

const Loader = React.memo(({ active }) => {
  const classes = useStyles()
  if (!active) {
    return null
  }
  return (
    <div className={classes.loader}>
      <CircularProgress />
    </div>
  )
})

const LoginForm = (lazyPorps) => {
  const classes = useStyles()

  const { actions, session } = useContext(SessionContext)
  const { signedIn } = session

  const [loading, setLoading] = useState(false)

  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [signInError, setSignInError] = useState('')

  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [signUpFirstName, setSignUpFirstName] = useState('')
  const [signUpLastName, setSignUpLastName] = useState('')
  const [signUpError, setSignUpError] = useState('')

  const signIn = async () => {
    setLoading(true)
    setSignInError('')
    const email = signInEmail
    const password = signInPassword
    try {
      await actions.signIn({ email, password }).then(res => console.log('login response', res))
    } catch (error) {
      setSignInError("The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.")
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    await actions.signOut()
    setLoading(false)
  }

  const signUp = async () => {
    setLoading(true)
    setSignUpError('')
    const firstName = signUpFirstName
    const lastName = signUpLastName
    const email = signUpEmail
    const password = signUpPassword
    try {
      await actions.signUp({
        firstName,
        lastName,
        email,
        password,
      })
    } catch (error) {
        console.log('signup error',error)
      setSignUpError("A customer with the same email address already exists in an associated website")
    } finally {
      setLoading(false)
    }
  }

  return (
      <Container className={classes.root}>
        {/* <Loader active={loading} /> */}
        {!signedIn ? (
          <>
            <div className={classes.spacingBlock}>
              <h3>SIGN IN</h3>
            </div>
            <div className={classes.spacingBlock}>
              <TextField
                type="email"
                value={signInEmail}
                label="Email"
                onChange={event => setSignInEmail(event.target.value)}
              />
            </div>
            <div className={classes.spacingBlock}>
              <TextField
                type="password"
                value={signInPassword}
                label="Password"
                onChange={event => setSignInPassword(event.target.value)}
              />
            </div>
            <div className={classes.spacingBlock}>
              <Button variant="outlined" onClick={signIn}>
                Sign In
              </Button>
            </div>
            {signInError && (
              <div className={classes.spacingBlock}>
                <b style={{ color: '#f00' }}>{signInError}</b>
              </div>
            )}
            <div className={classes.spacingBlock}>
              <p>or</p>
              <h3>SIGN UP</h3>
            </div>
            <div className={classes.spacingBlock}>
              <TextField
                value={signUpFirstName}
                label="First Name"
                onChange={event => setSignUpFirstName(event.target.value)}
              />
            </div>
            <div className={classes.spacingBlock}>
              <TextField
                value={signUpLastName}
                label="Last Name"
                onChange={event => setSignUpLastName(event.target.value)}
              />
            </div>
            <div className={classes.spacingBlock}>
              <TextField
                type="email"
                value={signUpEmail}
                label="Email"
                onChange={event => setSignUpEmail(event.target.value)}
              />
            </div>
            <div className={classes.spacingBlock}>
              <TextField
                type="password"
                value={signUpPassword}
                label="Password"
                onChange={event => setSignUpPassword(event.target.value)}
              />
            </div>
            <div className={classes.spacingBlock}>
              <Button variant="outlined" onClick={signUp}>
                Sign Up
              </Button>
            </div>
            {signUpError && (
              <div className={classes.spacingBlock}>
                <b style={{ color: '#f00' }}>{signUpError}</b>
              </div>
            )}
          </>
        ) : (
          <>
            <div className={classes.spacingBlock}>
              <Button variant="outlined" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          </>
        )}
      </Container>
  )
}

export default LoginForm
