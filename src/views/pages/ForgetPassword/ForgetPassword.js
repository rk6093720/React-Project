import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CToast,
  CToastBody,
  CToaster,
  CToastHeader,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cibFacebook, cibGoogle, cilLockLocked, cilUser } from '@coreui/icons'
import { useDispatch } from 'react-redux'
import { LoginUser } from '../../../Redux/Auth/action'
import { useToast } from '@chakra-ui/react'

const ForgetPassword = () => {
  //   Positive**–** Successful login with valid credentials.
  // – Login with a valid email and case-insensitive password.
  // – Successful login with a remembered email and password fields.
  // – Successful login after password reset.
  // – Login from multiple devices simultaneously.
  // – Successful login using a social media account integration.
  // – Login with a valid username and password within specified character limits.
  // – Successful login with special characters in the password.

  // Negative**–** Unsuccessful login with an invalid username and password.
  // – Login with a blank username and password.Unsuccessful login with an expired account.
  // – Login attempt with an account locked due to multiple unsuccessful tries.
  // – Login with a valid username and an incorrect case-sensitive password.
  // – Unsuccessful login with an account under review or pending approval.
  // – Login attempt with a deactivated or terminated user account.
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [flag, setFlag] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()
  const handle_login = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
      setFlag(true)
      return
    }
    const payload = {
      email,
      password,
    }
    dispatch(LoginUser(payload))
      .then((r) => {
        navigate('/dashboard')
        localStorage.setItem('rememberedEmail', email)
        localStorage.setItem('rememberedPassword', password)
        toast({
          title: 'Login Successfully.',
          description: 'Account Created',
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top',
        })
      })
      .catch((e) => {
        console.log(e)
        toast({
          title: 'Login Successfully.',
          description: "We've created your account for you.",
          status: 'danger',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
      })
  }
  useEffect(() => {
    const storedEmail = localStorage.getItem('rememberedEmail')
    const storedPassword = localStorage.getItem('rememberedPassword')

    if (storedEmail && storedPassword) {
      setEmail(storedEmail)
      setPassword(storedPassword)
    }
  }, [])
  return (
    <React.Fragment className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm
                    onSubmit={handle_login}
                    noValidate
                    validated={flag}
                    className="row g-3 needs-validation"
                  >
                    <h1>Forget Password</h1>
                    <p className="text-body-secondary">Forget Password</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        defaultValue="Mark"
                        feedbackValid="Looks good!"
                        id="validationCustom01"
                        required
                        placeholder="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6} >
                        <CButton type="submit" color="primary" className="px-4">
                          Reset Password
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </React.Fragment>
  )
}

export default ForgetPassword
