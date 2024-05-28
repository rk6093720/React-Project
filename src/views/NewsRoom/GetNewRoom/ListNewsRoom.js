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
import { deleteNEWSROOMjsl, getNEWSROOMjsl } from '../../../Redux/NewsRoom/action'
import { useToast } from '@chakra-ui/react'

const ListNewsRoom = () => {
  const discover = useSelector((state) => state.NewsRoom.newsroom)
  const dispatch = useDispatch()
  const toast = useToast();
  const handleDelete = (item) => {
    dispatch(deleteNEWSROOMjsl(item.id)).then(() => dispatch(getNEWSROOMjsl()))
     toast({
       title: 'NewsRoom Data is Deleted sucessfully',
       description: 'without login you donot create.',
       status: 'Danger',
       duration: 2000,
       isClosable: true,
       position: 'top',
     })
  }
  useEffect(() => {
    if (discover.length === 0) {
      dispatch(getNEWSROOMjsl())
       toast({
         title: 'NewsRoom Data is Read data successfully',
         description: 'without login you donot Read.',
         status: 'success',
         duration: 2000,
         isClosable: true,
         position: 'top',
       })
    }
  }, [discover.length, dispatch])
//   console.log(discover)
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
                    <Link to={`/newsroom/${item.id}/edit`}>
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

export default ListNewsRoom
