import { CButton, CCol, CForm, CFormInput, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { editDiscover, getdiscoverjsl } from '../../../Redux/App/action'
import { useDispatch, useSelector } from 'react-redux'
import { editSERVICE, getSERVICEjsl } from '../../../Redux/Service/action'
import { useToast } from '@chakra-ui/react'

const EditDiscover = () => {
  const { id } = useParams()
  const [validated, setValidated] = useState(false)
  const [imageFile, setImageFile] = useState('')
  const [Title, setTitle] = useState('')
  const [Content, setContent] = useState('')
  const [currentData, setCurrentData] = useState({})
  const dispatch = useDispatch()
  const jsldiscover = useSelector((state) => state.Service.service)
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
    dispatch(editSERVICE(id, payload)).then(() => dispatch(getSERVICEjsl()))
    toast({
         title: 'Service Edited.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 2000,
          isClosable: true,
          position:"top"
    })
  }

  useEffect(() => {
    let timeoutId
    const handleDispatch = () => {
      if (jsldiscover.length === 0) {
        dispatch(getSERVICEjsl())
        toast({
          title: 'Service Getting.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 2000,
          isClosable: true,
          position: 'top',
        })
      }
    }
    const debounceDispatch = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(handleDispatch, 500)
    }

    debounceDispatch()

    return () => {
      clearTimeout(timeoutId)
    }
  }, [jsldiscover.length, dispatch])

  useEffect(() => {
    if (id && jsldiscover.length > 0) {
      const discoverbyid = jsldiscover.find((item) => item.id === Number(id))
      console.log(discoverbyid)
      if (discoverbyid) {
        setCurrentData(discoverbyid)
        setImageFile(discoverbyid.Image || '')
        setContent(discoverbyid.Content)
        setTitle(discoverbyid.Title)
      }
    }
  }, [id, jsldiscover])

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
            feedbackValid="Looks good!"
            id="validationCustom02"
            label="Content"
            required
          />
        </CRow>
        <div className="mb-3">
          <CFormInput
            type="file"
            feedbackValid="Looks good"
            onChange={(e) => setImageFile(e.target.files[0])}
            id="validationCustom05"
            label="Image"
          />
        </div>
        <CCol xs={12}>
          <CButton color="primary" type="submit">
            Edit
          </CButton>
        </CCol>
      </CForm>
    </div>
  )
}

export default EditDiscover
