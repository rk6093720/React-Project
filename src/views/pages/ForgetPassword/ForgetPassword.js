import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {  cilUser } from '@coreui/icons'
import { useDispatch } from 'react-redux'
import { useToast } from '@chakra-ui/react'
const ForgetPassword = () => {
  const [email, setEmail] = useState('')
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
      email
    }
    dispatch(forgetpassword(payload))
      .then((r) => {
        localStorage.setItem('rememberedEmail', email)
        toast({
          title: 'ForgetPassword Successfully.',
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
          title: 'forget unsuccessfully.',
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
    if (storedEmail ) {
      setEmail(storedEmail)
    }
  }, [])
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
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
                      <CCol xs={6} className='d-grid gap-2 col-6 mx-auto'>
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
    </div>
  )
}

export default ForgetPassword
