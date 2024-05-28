import {  CForm, CFormInput, CFormLabel, CInputGroup, CInputGroupText,CFormCheck,CFormSelect,CFormFeedback,CButton, CRow } from '@coreui/react'
import React, { useState } from 'react'

const Profile = () => {
  const [validated, setValidated] = useState(false)
  const [imageFile,setImageFile] = useState("")
  const handleSubmit = (event) => {
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)
  }
  return (
    <div className="" style={{ width: '100%', height: '800px', margin: 'auto' }}>
      <div className="" style={{ width: '100%', height: '100%', display: 'flex' }}>
        <div style={{ width: '50%', height: '100%', padding: '10px' }}>
          <h1 style={{ color: 'teal', fontFamily: 'initial', fontSize: '18px' }}>Update Profile</h1>
          <hr style={{ color: 'teal', fontFamily: 'initial', border: '2px solid teal' }} />
          <CForm
            className="row g-1 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <CRow mb={4} style={{ width: '100%', marginLeft: '15px', border: '1px solid red' }}>
              <CFormInput
                type="text"
                defaultValue="Full name"
                feedbackValid="Looks good!"
                id="validationCustom01"
                label="Full name"
                style={{
                  width: '100%',
                  marginLeft: '10px',
                  marginTop: '15px',
                }}
                required
              />
            </CRow>
            <CRow mb={4}>
              <CFormInput
                type="text"
                defaultValue="phone number"
                feedbackValid="Looks good!"
                id="validationCustom02"
                label="phone number"
                style={{
                  width: '100%',
                  marginLeft: '10px',
                  marginTop: '15px',
                }}
                required
              />
            </CRow>
            <div
              className="mb-1"
              style={{ margin: 'auto', marginTop: '15px', width: '100%', padding: '10px' }}
            >
              <CFormInput
                type="file"
                feedbackvalid="Looks goods"
                onChange={(e) => setImageFile(e.target.files[0])}
                id="validationCustom05"
                label="Profile-Image"
                style={{
                  padding: '8px',
                }}
              />
            </div>
            <CRow xs={12} className="postion-relative">
              <CButton
                color="primary"
                type="submit"
                style={{
                  width: '50%',
                  padding: '5px',
                  marginLeft: '13px',
                  border: '1px solid white',
                }}
              >
                Edit Profile
              </CButton>
            </CRow>
          </CForm>
          <br />
          <h1 style={{ color: 'teal', fontFamily: 'initial', fontSize: '18px' }}>Change Email</h1>
          <hr style={{ color: 'teal', fontFamily: 'initial', border: '2px solid teal' }} />
          <CForm
            className="row g-1 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <CRow
              mb={4}
              style={{
                width: '100%',
                marginLeft: '15px',
                marginTop: '20px',
                border: '1px solid red',
              }}
            >
              <CFormInput
                type="text"
                defaultValue="Password"
                feedbackValid="Looks good!"
                id="validationCustom01"
                label="Password"
                style={{
                  width: '100%',
                  marginLeft: '10px',
                  marginTop: '15px',
                }}
                required
              />
            </CRow>
            <CRow mb={4}>
              <CFormInput
                type="text"
                defaultValue="Email"
                feedbackValid="Looks good!"
                id="validationCustom02"
                label="Email"
                style={{
                  width: '100%',
                  marginLeft: '10px',
                  marginTop: '15px',
                }}
                required
              />
            </CRow>
            <CRow xs={12} className="postion-relative">
              <CButton
                color="primary"
                type="submit"
                style={{
                  width: '50%',
                  padding: '5px',
                  marginLeft: '13px',
                  marginTop: '15px',
                }}
              >
                Change Email
              </CButton>
            </CRow>
          </CForm>
        </div>
        <div style={{ color: 'teal', height: '100%', border: '2px solid teal' }}></div>
        <div style={{ width: '50%', height: '100%', margin: 'auto' }}>
          <div style={{ width: '100%', height: '100%', padding: '10px' }}>
            <h1 style={{ color: 'teal', fontFamily: 'initial', fontSize: '18px' }}>
              Change Password
            </h1>
            <hr style={{ color: 'teal', fontFamily: 'sans-serif', border: '2px solid teal' }} />
            <CForm
              className="row g-1 needs-validation"
              noValidate
              validated={validated}
              onSubmit={handleSubmit}
            >
              <CRow mb={4} style={{ width: '100%', marginLeft: '15px', border: '1px solid red' }}>
                <CFormInput
                  type="text"
                  defaultValue="Old password"
                  feedbackValid="Looks good!"
                  id="validationCustom01"
                  label="Old password"
                  style={{
                    width: '100%',
                    marginLeft: '10px',
                    marginTop: '15px',
                  }}
                  required
                />
              </CRow>
              <CRow mb={4}>
                <CFormInput
                  type="text"
                  defaultValue="New Password"
                  feedbackValid="Looks good!"
                  id="validationCustom02"
                  label="New Password"
                  style={{
                    width: '100%',
                    marginLeft: '10px',
                    marginTop: '19px',
                  }}
                  required
                />
              </CRow>
              <CRow mb={4}>
                <CFormInput
                  type="text"
                  defaultValue="Confirm Password"
                  feedbackValid="Looks good!"
                  id="validationCustom02"
                  label="Confirm Password"
                  style={{
                    width: '100%',
                    marginLeft: '10px',
                    marginTop: '25px',
                  }}
                  required
                />
              </CRow>
              <CRow xs={12} className="postion-relative">
                <CButton
                  color="primary"
                  type="submit"
                  style={{
                    width: '50%',
                    padding: '5px',
                    marginLeft: '13px',
                    border: '1px solid white',
                    marginTop: '35px',
                  }}
                >
                  Change Password
                </CButton>
              </CRow>
            </CForm>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
