import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterUser } from '../../../Redux/Auth/action'
import { useToast } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { REGISTER_SUCCESS } from '../../../Redux/Auth/actionTypes'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [flag, setFlag] = useState('')
  const toast = useToast()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleForm = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
      setFlag(true)
      return
    }
    if (password.length < 8) {
      toast({
        title: 'Password is too short. Please enter a password with at least 8 characters.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
      return
    }
    const payload = {
      email,
      password,
      username,
      password2
    }
    dispatch(RegisterUser(payload))
      .then((r) => {
        console.log(r);
        if (r.type === REGISTER_SUCCESS) {
          localStorage.setItem('rememberedemail', email)
          localStorage.setItem('rememberedpassword', password)
          localStorage.setItem('rememberedusername', username)
          localStorage.setItem('rememberedpassword2', password2)
          toast({
            title: 'Registration successful.',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
          })
          navigate('/login')
        } else if (r.payload.response.status === 400) {
          toast({
            title: 'User already exists.',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top',
          })
        }
      })
      .catch((e) => {
        console.log(e)
        toast({
          title: 'Registration failed.',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
      })
  }

  useEffect(() => {
    const storedemail = localStorage.getItem('rememberedemail')
    const storedpassword = localStorage.getItem('rememberedpassword')
    const storedusername = localStorage.getItem('rememberedusername')
    const cnfpassword = localStorage.getItem('rememberedpassword2')

    if (storedemail && storedpassword && cnfpassword && storedusername) {
      setEmail(storedemail)
      setPassword(storedpassword)
      setUsername(storedusername)
      setPassword2(cnfpassword)
    }
  }, [])

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm
                  noValidate
                  validated={flag}
                  className="row g-3 needs-validation"
                  onSubmit={handleForm}
                >
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                      autoComplete="username"
                      required
                      // defaultValue="Username"
                      feedbackValid="Looks good!"
                      // id="validationCustom01"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      autoComplete="email"
                      required
                      // defaultValue="email"
                      feedbackValid="Looks good!"
                      // id="validationCustom01"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      autoComplete="new-password"
                      required
                      // defaultValue="password"
                      feedbackValid="Looks good!"
                      // id="validationCustom01"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      required
                      // defaultValue="password"
                      feedbackValid="Looks good!"
                      // id="validationCustom01"
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton type="submit" color="success">
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
              <p className="text-center">
                If you have an account on JSL India, <Link to="/login">Login Now!</Link>
              </p>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
