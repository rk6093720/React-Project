import { CButton, CCol, CForm, CFormCheck, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CInputGroup, CInputGroupText, CRow } from '@coreui/react'
import React, { useState } from 'react'
import { getdiscoverjsl, postDiscover } from '../../../Redux/App/action';
import { useToast } from '@chakra-ui/react';

const AddDiscover = () => {
    const [validated, setValidated] = useState(false);
    const [imageFile, setImageFile] = useState('') // Changed state variable name to imageFile
    const [Title, setTitle] = useState('')
    const [Introduction, setIntroduction] = useState('')
    const [Vision, setVision] = useState('')
    const [Mission, setMission] = useState('');
    const toast = useToast();

    const handleSubmit = (event) => {
        event.preventDefault()
      const form = event.currentTarget
      if (form.checkValidity() === false) {
        event.stopPropagation()
      }
      setValidated(true)
         const payload = {
           Image: imageFile,
           Title,
           Introduction,
           Vision,
           Mission,
         }
         dispatch(postDiscover(payload)).then(() => dispatch(getdiscoverjsl()));
          toast({
            title: 'Discover Data is create sucessfully',
            description: 'without login you donot create.',
            status: 'Danger',
            duration: 2000,
            isClosable: true,
            position: 'top',
          })
    }
  return (
    <div>
      <CForm
        className="row g-3 needs-validation"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <CRow md={4}>
          <CFormInput
            type="text"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            defaultValue="Title"
            feedbackValid="Looks good!"
            id="validationCustom01"
            label="Title"
            required
          />
        </CRow>
        <CRow md={4}>
          <CFormInput
            type="text"
            value={Introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            defaultValue="Introduction"
            feedbackValid="Looks good!"
            id="validationCustom02"
            label="Introduction"
            required
          />
        </CRow>
        <CRow md={4}>
          <CFormInput
            type="text"
            value={Vision}
            onChange={(e) => setVision(e.target.value)}
            defaultValue="vision"
            aria-describedby="inputGroupPrependFeedback"
            feedbackValid="Looks good"
            id="validationCustomUsername"
            label="Vision"
            required
          />
        </CRow>
        <CRow md={3}>
          <CFormInput
            type="text"
            value={Mission}
            onChange={(e) => setMission(e.target.value)}
            defaultValue="Mission"
            feedbackValid="Looks goods"
            id="validationCustomMission"
            label="Mission"
            required
          />
        </CRow>
        <div className="mb-3">
          <CFormInput
            type="file"
            feedbackvalid="Looks goods"
            onChange={(e) => setImageFile(e.target.files[0])}
            id="validationCustom05"
            label="Image"
          />
        </div>

        <CCol xs={12}>
          <CButton color="primary" type="submit">
            Add
          </CButton>
        </CCol>
      </CForm>
    </div>
  )
}

export default AddDiscover
