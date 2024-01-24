import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TableComponent from '~/components/TableComponent/TableComponent';
import { useEffect, useState } from 'react';
import InputComponent from '~/components/InputComponent/InputComponent';
import UploadComponent from '~/components/InputComponent/UploadComponent/UploadComponent';
import CloseIcon from '@mui/icons-material/Close';
import * as ProductServices from '~/services/productService';
import { useMutationHook } from '~/hooks/useMutationHook';

function AdminProduct() {
  const [openModal, setOpenModal] = useState(false);
  const [errorProduct, setErrorProduct] = useState('');
  const [stateProduct, setStateProduct] = useState({
    name: '',
    type: '',
    countInStock: '',
    price: '',
    description: '',
    rating: '',
    location: '',
    discount: '',
    sold: ''
  });

  const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
  };

  //onChangeInput
  const handleChangeProduct = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.id]: e.target.value
    });
  };

  //upload image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setStateProduct({
          ...stateProduct,
          image: event.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  //MuTation
  const mutation = useMutationHook((data) => {
    return ProductServices.createProduct(data);
  });

  const { data, isLoading, isError, isSuccess, error } = mutation;

  useEffect(() => {
    if (isSuccess) {
      setOpenModal(false);
      setStateProduct({
        name: '',
        type: '',
        countInStock: '',
        price: '',
        description: '',
        rating: '',
        location: '',
        discount: '',
        sold: '',
        image: ''
      });
    } else if (isError) {
      setErrorProduct(error.response.data.message);
    }
  }, [isSuccess, isError]);

  //khi thoát modal
  const handleCancelModal = () => {
    setStateProduct({
      name: '',
      type: '',
      countInStock: '',
      price: '',
      description: '',
      rating: '',
      location: '',
      discount: '',
      sold: '',
      image: ''
    });
    setOpenModal(false);
  };

  //submit
  const handleSubmitForm = (e) => {
    e.preventDefault();
    mutation.mutate({ ...stateProduct });
  };
  return (
    <Box sx={{ pt: 5 }}>
      <Typography py={2} sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
        Quản Lý Sản Phẩm
      </Typography>
      <Button sx={{ width: '150px', height: '150px', border: '5px solid #34495e' }} onClick={() => setOpenModal(true)}>
        <AddIcon sx={{ fontSize: '10rem' }}></AddIcon>
      </Button>
      <TableComponent></TableComponent>

      <Modal
        open={openModal}
        // onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
              borderBottom: '1px solid #ccc',
              '& .MuiTypography-root': {
                fontSize: '1.6rem',
                fontWeight: 700
              },
              '& .MuiSvgIcon-root': {
                fontSize: '2rem'
              }
            }}
          >
            <Typography>Thông Tin Sản Phẩm</Typography>

            <IconButton onClick={() => setOpenModal(false)}>
              <CloseIcon></CloseIcon>
            </IconButton>
          </Box>
          <form onSubmit={handleSubmitForm}>
            <InputComponent
              label="Name"
              id="name"
              value={stateProduct.name}
              handleChange={handleChangeProduct}
              width="350px"
            ></InputComponent>
            <InputComponent
              label="Type"
              id="type"
              value={stateProduct.type}
              handleChange={handleChangeProduct}
              width="350px"
            ></InputComponent>
            <InputComponent
              label="Count In Stock"
              id="countInStock"
              value={stateProduct.countInStock}
              handleChange={handleChangeProduct}
              width="350px"
            ></InputComponent>
            <InputComponent
              label="Price"
              id="price"
              value={stateProduct.price}
              handleChange={handleChangeProduct}
              width="350px"
            ></InputComponent>
            <InputComponent
              label="Description"
              id="description"
              value={stateProduct.description}
              handleChange={handleChangeProduct}
              width="350px"
            ></InputComponent>
            <InputComponent
              label="Rating"
              id="rating"
              value={stateProduct.rating}
              handleChange={handleChangeProduct}
              width="350px"
            ></InputComponent>
            <InputComponent
              label="Location"
              id="location"
              value={stateProduct.location}
              handleChange={handleChangeProduct}
              width="350px"
            ></InputComponent>
            <InputComponent
              label="Discount"
              id="discount"
              value={stateProduct.discount}
              handleChange={handleChangeProduct}
              width="350px"
            ></InputComponent>
            <InputComponent
              label="Sold"
              id="sold"
              value={stateProduct.sold}
              handleChange={handleChangeProduct}
              width="350px"
            ></InputComponent>
            <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
              <Typography sx={{ fontSize: '1.4rem', fontWeight: 600, mr: 12 }}>Image</Typography>
              <UploadComponent handleImageChange={handleImageChange}></UploadComponent>
              {stateProduct?.image && (
                <img src={stateProduct.image} style={{ width: '33px', height: '33px', marginLeft: '10px' }}></img>
              )}
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                '& .MuiButtonBase-root': {
                  ml: 1,
                  padding: '8px 16px',
                  fontSize: '1.2rem',
                  fontWeight: 600
                }
              }}
            >
              {errorProduct?.status === 'ERR' ? (
                <Typography sx={{ fontSize: '1.2rem', color: 'red', fontWeight: 600 }}>
                  {errorProduct?.message}
                </Typography>
              ) : (
                ''
              )}
              <Button variant="outlined" sx={{ borderColor: '#34495e', color: '#34495e' }} onClick={handleCancelModal}>
                Thoát
              </Button>
              <Button
                disabled={
                  stateProduct.name &&
                  stateProduct.countInStock &&
                  stateProduct.description &&
                  stateProduct.discount &&
                  stateProduct.location &&
                  stateProduct.price &&
                  stateProduct.rating &&
                  stateProduct.sold &&
                  stateProduct.type &&
                  stateProduct.image
                    ? false
                    : true
                }
                variant="contained"
                type="submit"
                sx={{ backgroundColor: '#34495e' }}
              >
                Tạo Mới
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}

export default AdminProduct;
