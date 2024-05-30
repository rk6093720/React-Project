import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CInputGroupText,
  CButton,
  CRow,
} from '@coreui/react'
import { ChangeMailFetch, ChangepasswordFetch, ProfileFetch, UpdateChangeMailFetch, UpdateChangePasswordFetch, UpdateProfileFetch } from '../../../Redux/Auth/action'
import { useToast } from '@chakra-ui/react'

const Profile = () => {
  const [validated, setValidated] = useState(false)
  const [phone_number, setPhoneNumber] = useState('')
  const [full_name, setFullName] = useState('')
  const [image, setImage] = useState(null);
  const [new_email,setNew_email]=useState("");
  const [password,setPassword]=useState("");
  const [old_password,setOld_password]=useState("");
  const [new_password,setNew_password]=useState("");
  const [confirm_password, setConfirm_password] = useState('')
  const profile = useSelector((state) => state.Auth.profileData)
  const changemail = useSelector((state) => state.Auth.changeEmail)
  const changepassword = useSelector((state) => state.Auth.changepassword)
  const getToken = () => {
    return JSON.parse(localStorage.getItem('auth'))
  }
  const Authtoken = getToken()?.token;
  const dispatch = useDispatch()
  const toast = useToast();
  const token = {
    headers: {
      Authorization: `Bearer ${Authtoken}`,
      'Content-Type': 'multipart/form-data',
    },
  }
  useEffect(() => {
    dispatch(ProfileFetch(token))
  }, [dispatch])

  // useEffect(()=>{
  //   dispatch(ChangeMailFetch())
  // },[dispatch])
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '')
      setPhoneNumber(profile.phone_number ? profile.phone_number.replace('+91', '') : '')
      // Assuming image URL is stored in profile.image
      setImage(profile.image || null)
    }
    else if(changemail){
      setNew_email(changemail.new_email || changemail.email)
    }
    else if(changepassword){
      setOld_password(changepassword.old_password || changepassword.password)
    }
  }, [profile,changemail,changepassword])
// change profile
  const handleProfile = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
      setValidated(true)
      return
    }

    const payload = {
      image,
      full_name,
      phone_number: `+91${phone_number}`,
    }

    dispatch(UpdateProfileFetch(payload,token)).then(() => {
      dispatch(ProfileFetch(token))
      toast({
        title: 'Edit profile successfully.',
        description: "Edit.",
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    })
  }
// change Email
const handleChangeEmail=(e)=>{
  e.preventDefault();
  const form = e.currentTarget
  if (form.checkValidity() === false) {
    e.stopPropagation()
    setValidated(true)
    return
  }
  const payload={
    new_email,
    password
  }
  dispatch(UpdateChangeMailFetch(payload,token)).then(()=>{
    dispatch(ChangeMailFetch(token))
    toast({
      title: 'Edit Mail successfully.',
      description: 'Edit.',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
    })
  })
}
//change password
const handlePassword=(e)=>{
  e.preventDefault();
  const form = e.currentTarget
  if (form.checkValidity() === false) {
    e.stopPropagation()
    setValidated(true)
    return
  }
  const payload={
    old_password,
    new_password,
    confirm_password
  }
   dispatch(UpdateChangePasswordFetch(payload, token)).then(() => {
     dispatch(ChangepasswordFetch(token))
     toast({
       title: 'Edit Password successfully.',
       description: 'Edit.',
       status: 'success',
       duration: 3000,
       isClosable: true,
       position: 'top',
     })
   })
}
// console.log(changemail,profile,token);
  return (
    <div style={{ width: '100%', height: '800px', margin: 'auto' }}>
      <div style={{ width: '100%', height: '100%', display: 'flex' }}>
        <div style={{ width: '50%', height: '100%', padding: '10px' }}>
          <h1 style={{ color: 'teal', fontFamily: 'initial', fontSize: '18px' }}>Update Profile</h1>
          <hr style={{ color: 'teal', fontFamily: 'initial', border: '2px solid teal' }} />
          <CForm
            className="row g-1 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleProfile}
          >
            <CRow mb={4} style={{ width: '100%', marginLeft: '15px' }}>
              <CFormInput
                type="text"
                placeholder="Full name"
               // id="validationCustom01"
                label="Full name"
                style={{ width: '100%', marginLeft: '10px', marginTop: '15px' }}
                value={full_name}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </CRow>
            <CRow mb={4}>
              <CFormLabel htmlFor="validationCustomphonenumber">Phone number</CFormLabel>
              <CInputGroup className="has-validation">
                <CInputGroupText>+91</CInputGroupText>
                <CFormInput
                  type="text"
                  placeholder="phone-number"
                //  id="validationCustomphone"
                  value={phone_number}
                  maxLength={10}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </CInputGroup>
            </CRow>
            <div
              className="mb-1"
              style={{ margin: 'auto', marginTop: '15px', width: '100%', padding: '10px' }}
            >
              <CFormInput
                type="file"
               // id="validationCustom05"
                label="Profile-Image"
                style={{ padding: '8px' }}
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <CRow className="position-relative">
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
          <hr style={{ color: 'teal', border: '2px solid teal',backgroundColor:"teal" }} />
          <CForm
            className="row g-1 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleChangeEmail}
          >
            <CRow mb={4} style={{ width: '100%', marginLeft: '15px', marginTop: '20px' }}>
              <CFormInput
                type="password"
                placeholder="Password"
                //id="validationCustom01"
                label="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                style={{ width: '100%', marginLeft: '10px', marginTop: '15px' }}
                required
              />
            </CRow>
            <CRow mb={4}>
              <CFormInput
                type="email"
                placeholder="Email"
                //id="validationCustom02"
                label="Email"
                value={new_email}
                onChange={(e)=>setNew_email(e.target.value)}
                style={{ width: '100%', marginLeft: '10px', marginTop: '15px' }}
                required
              />
            </CRow>
            <CRow className="position-relative">
              <CButton
                color="primary"
                type="submit"
                style={{ width: '50%', padding: '5px', marginLeft: '13px', marginTop: '15px' }}
              >
                Change Email
              </CButton>
            </CRow>
          </CForm>
        </div>
        <div style={{ color: 'teal', height: '100%', border: '2px solid teal' }}></div>
        <div style={{ width: '50%', height: '100%', margin: 'auto' }}>
          <div style={{ width: '100%', height: '50%', padding: '10px' }}>
            <h1 style={{ color: 'teal', fontFamily: 'initial', fontSize: '18px' }}>
              Change Password
            </h1>
            <hr style={{ color: 'teal', fontFamily: 'sans-serif', border: '2px solid teal' }} />
            <CForm
              className="row g-1 needs-validation"
              noValidate
              validated={validated}
             onSubmit={handlePassword}
            >
              <CRow mb={4} style={{ width: '100%', marginLeft: '15px' }}>
                <CFormInput
                  type="password"
                  placeholder="Old password"
                //  id="validationCustom01"
                value={old_password}
                onChange={(e)=>setOld_password(e.target.value)}
                  label="Old password"
                  style={{ width: '100%', marginLeft: '10px', marginTop: '15px' }}
                  required
                />
              </CRow>
              <CRow mb={4}>
                <CFormInput
                  type="password"
                  placeholder="New Password"
                //  id="validationCustom02"
                  value={new_password}
                  onChange={(e)=>setNew_password(e.target.value)}
                  label="New Password"
                  style={{ width: '100%', marginLeft: '10px', marginTop: '19px' }}
                  required
                />
              </CRow>
              <CRow mb={4}>
                <CFormInput
                  type="password"
                  placeholder="Confirm Password"
                //  id="validationCustom02"
                 value={confirm_password}
                 onChange={(e)=>setConfirm_password(e.target.value)}
                  label="Confirm Password"
                  style={{ width: '100%', marginLeft: '10px', marginTop: '25px' }}
                  required
                />
              </CRow>
              <CRow className="position-relative">
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
