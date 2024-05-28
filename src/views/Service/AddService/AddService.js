import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CRow,
} from '@coreui/react'
import React, { useState } from 'react'
import { getSERVICEjsl, postSERVICE } from '../../../Redux/Service/action'
import { useToast } from '@chakra-ui/react'

const AddDiscover = () => {
  const [validated, setValidated] = useState(false)
  const [imageFile, setImageFile] = useState('') // Changed state variable name to imageFile
  const [Title, setTitle] = useState('')
  const [Content, setContent] = useState('');
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
      Content
    }
    dispatch(postSERVICE(payload)).then(() => dispatch(getSERVICEjsl()))
    toast({
      title: 'Service created.',
      description: "We've created your account for you.",
      status: 'success',
      duration: 2000,
      isClosable: true,
      position:"top"
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
            value={Content}
            onChange={(e) => setContent(e.target.value)}
            defaultValue="Content"
            feedbackValid="Looks good!"
            id="validationCustom02"
            label="Content"
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
