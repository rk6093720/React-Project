import {
  CButton,
  CImage,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash } from '@coreui/icons'
import { Link } from 'react-router-dom'
import { deleteSERVICEjsl, getSERVICEjsl } from '../../../Redux/Service/action'
import { useToast } from '@chakra-ui/react'

const Discover = () => {
  const discover = useSelector((state) => state.Service.service)
  const dispatch = useDispatch();
  const toast = useToast();
  const handleDelete = (item) => {
    dispatch(deleteSERVICEjsl(item.id)).then(() => dispatch(getSERVICEjsl()))
    toast({
      title: 'Service Data is  Getting.',
      description: "We've created your account for you.",
      status: 'danger',
      duration: 2000,
      isClosable: true,
      position: 'top',
    })
  }
  useEffect(() => {
    if (discover.length === 0) {
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
  }, [discover.length, dispatch])
  console.log(discover)
  return (
    <div>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">id</CTableHeaderCell>
            <CTableHeaderCell scope="col">Image</CTableHeaderCell>
            <CTableHeaderCell scope="col">Title</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {discover.length > 0 &&
            discover.map((item) => (
              <CTableRow key={item.id}>
                <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                <CTableDataCell>
                  <CImage src={item.Image} alt="image" width={100} height={100} />
                </CTableDataCell>
                <CTableDataCell>{item.Title}</CTableDataCell>
                <CTableDataCell>
                  <div className="d-flex">
                    <Link to={`/service/${item.id}/edit`}>
                      <CButton
                        size="sm"
                        style={{ backgroundColor: 'blue', color: 'white', marginRight: '5px' }}
                      >
                        <CIcon icon={cilPencil} />
                      </CButton>
                    </Link>
                    <CButton
                      size="sm"
                      style={{ backgroundColor: 'red', color: 'white', marginRight: '5px' }}
                      onClick={() => handleDelete(item)}
                    >
                      <CIcon icon={cilTrash} />
                    </CButton>
                  </div>
                </CTableDataCell>
              </CTableRow>
            ))}
        </CTableBody>
      </CTable>
    </div>
  )
}

export default Discover
