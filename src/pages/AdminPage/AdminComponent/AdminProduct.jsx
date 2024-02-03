import { Box, Button, IconButton, Modal, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TableComponent from '~/components/TableComponent/TableComponent';
import { useEffect, useState } from 'react';
import InputComponent from '~/components/InputComponent/InputComponent';
import UploadComponent from '~/components/InputComponent/UploadComponent/UploadComponent';
import CloseIcon from '@mui/icons-material/Close';
import * as ProductServices from '~/services/productService';
import { useMutationHook } from '~/hooks/useMutationHook';
import { useQuery } from 'react-query';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DrawerComponent from '~/components/DrawerComponent/DrawerComponent';
import { useSelector } from 'react-redux';
import LoadingComponent from '~/components/LoadingComponent/LoadingComponent';

function AdminProduct() {
  const [openModal, setOpenModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [errorProduct, setErrorProduct] = useState('');
  const [selectedRows, setSelectedRows] = useState('');
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
  const [stateUpdateProduct, setStateUpdateProduct] = useState({
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
  // const userAccess = localStorage.getItem('access_token');
  const user = useSelector((state) => state.user);
  //css boxModal
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

  //1-----------------Lấy Dữ liệu Data đưa về table-----------------
  const fetchGetDataProduct = async () => {
    const res = await ProductServices.getAllProduct();
    return res;
  };

  const ProductQuery = useQuery(['products'], fetchGetDataProduct);
  const { isLoading: LoadingProduct, data: productData } = ProductQuery;
  const dataTable =
    productData?.data.length &&
    productData?.data?.map((product) => {
      return { ...product, key: product._id };
    });
  //1end----------------- Lấy Dữ liệu Data đưa về table-----------------

  //2------------Xử Lý khi bấm vào chỉnh sửa sản phẩm gồm :hiện thanh drawer và get lại productDetail và submit

  const handleCloseDrawer = () => {
    setStateUpdateProduct({
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
    setOpenDrawer(false);
  };
  //onChangeInput
  const handleChangeProductDetails = (e) => {
    setStateUpdateProduct({
      ...stateUpdateProduct,
      [e.target.id]: e.target.value
    });
  };

  //upload image
  const handleImageChangeDetails = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setStateUpdateProduct({
          ...stateUpdateProduct,
          image: event.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchDataProductDetail = async () => {
    const res = await ProductServices.getProductDetails(selectedRows);
    if (res?.data) {
      setStateUpdateProduct({
        name: res?.data.name || '',
        type: res?.data.type || '',
        countInStock: res?.data.countInStock || '',
        price: res?.data.price || '',
        description: res?.data.description || '',
        rating: res?.data.rating || '',
        location: res?.data.location || '',
        discount: res?.data.discount || '',
        sold: res?.data.sold || '',
        image: res?.data.image || ''
      });
    }
    return res;
  };
  const handleEditClick = () => {
    setOpenDrawer(true);
  };
  useEffect(() => {
    if (selectedRows) {
      fetchDataProductDetail();
    }
  }, [selectedRows]);

  const renderAction = () => {
    return (
      <Box
        gap={2}
        sx={{
          display: 'flex',
          // justifyContent: 'space-between',
          alignItems: 'center',
          '& .MuiSvgIcon-root': {
            fontSize: '2rem'
          }
        }}
      >
        <DeleteIcon></DeleteIcon>
        <ModeEditIcon onClick={handleEditClick}></ModeEditIcon>
      </Box>
    );
  };
  const columns = [
    { field: '_id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'price', headerName: 'Price', width: 130 },
    { field: 'countInStock', headerName: 'CountInStock', width: 130 },
    {
      field: 'type',
      headerName: 'Type',
      width: 130
    },
    {
      field: 'description',
      headerName: 'Description',
      sortable: false,
      width: 160
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 160,
      renderCell: (params) => renderAction(params.row._id)
    }
  ];

  const handleClickTable = (selectionModel) => {
    setSelectedRows(selectionModel.id);
  };

  //Xử lý submit update dữ liệu vào data bằng useMutation

  const mutationUpdate = useMutationHook((data) => {
    return ProductServices.updateProduct(selectedRows, user?.access_token, data);
  });

  const { isLoading: loadingUpdate, isSuccess: successUpdate, isError: errorUpdate, data } = mutationUpdate;

  useEffect(() => {
    if (successUpdate && data?.status === 'OK') {
      setOpenDrawer(false);
    } else if (errorUpdate) {
      console.log('bi loi');
    }
  }, [successUpdate]);

  const handleSubmitUpdateForm = (e) => {
    e.preventDefault();
    mutationUpdate.mutate(
      { ...stateUpdateProduct },
      {
        onSettled: () => {
          ProductQuery.refetch();
        }
      }
    );
  };
  //2end---------Xử Lý khi bấm vào chỉnh sửa sản phẩm gồm :hiện thanh drawer và get lại productDetail và submit

  //3-------------Khi Tạo Bảng về nhập dữ liệu vào submit để tạo sản phẩm mới------------
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

  const { isError, isSuccess, error } = mutation;

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
  //3end-------------Khi Tạo Bảng về nhập dữ liệu vào submit để tạo sản phẩm mới-------

  return (
    <Box sx={{ pt: 5 }}>
      <Typography py={2} sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
        Quản Lý Sản Phẩm
      </Typography>
      <Button sx={{ width: '150px', height: '150px', border: '5px solid #34495e' }} onClick={() => setOpenModal(true)}>
        <AddIcon sx={{ fontSize: '10rem' }}></AddIcon>
      </Button>
      {loadingUpdate ? (
        <LoadingComponent time={2300}></LoadingComponent>
      ) : (
        <TableComponent
          products={productData?.data}
          columns={columns}
          dataProduct={dataTable}
          LoadingProduct={LoadingProduct}
          getRowId={(dataTable) => dataTable._id}
          onRowClick={handleClickTable}
        ></TableComponent>
      )}

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

      {/* DrawerHandle */}
      <DrawerComponent anchor="right" openDrawer={openDrawer} closeDrawer={handleCloseDrawer}>
        <Box
          sx={{
            mt: 9,
            px: 4
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 2,
              py: 1,
              borderBottom: '1px solid #ccc',
              '& .MuiTypography-root': {
                fontSize: '1.6rem',
                fontWeight: 700
              }
            }}
          >
            <Typography>Thông Tin Sản Phẩm</Typography>
          </Box>
          <form onSubmit={handleSubmitUpdateForm}>
            <InputComponent
              label="Name"
              id="name"
              value={stateUpdateProduct.name}
              handleChange={handleChangeProductDetails}
              width="350px"
            ></InputComponent>
            <InputComponent
              label="Type"
              id="type"
              value={stateUpdateProduct.type}
              handleChange={handleChangeProductDetails}
              width="350px"
            ></InputComponent>
            <InputComponent
              label="Count In Stock"
              id="countInStock"
              value={stateUpdateProduct.countInStock}
              handleChange={handleChangeProductDetails}
              width="350px"
            ></InputComponent>
            <InputComponent
              label="Price"
              id="price"
              value={stateUpdateProduct.price}
              handleChange={handleChangeProductDetails}
              width="350px"
            ></InputComponent>
            <InputComponent
              label="Description"
              id="description"
              value={stateUpdateProduct.description}
              handleChange={handleChangeProductDetails}
              width="350px"
            ></InputComponent>
            <InputComponent
              label="Rating"
              id="rating"
              value={stateUpdateProduct.rating}
              handleChange={handleChangeProductDetails}
              width="350px"
            ></InputComponent>
            <InputComponent
              label="Location"
              id="location"
              value={stateUpdateProduct.location}
              handleChange={handleChangeProductDetails}
              width="350px"
            ></InputComponent>
            <InputComponent
              label="Discount"
              id="discount"
              value={stateUpdateProduct.discount}
              handleChange={handleChangeProductDetails}
              width="350px"
            ></InputComponent>
            <InputComponent
              label="Sold"
              id="sold"
              value={stateUpdateProduct.sold}
              handleChange={handleChangeProductDetails}
              width="350px"
            ></InputComponent>
            <Box sx={{ display: 'flex', mb: 2, alignItems: 'center' }}>
              <Typography sx={{ fontSize: '1.4rem', fontWeight: 600, mr: 12 }}>Image</Typography>
              <UploadComponent handleImageChange={handleImageChangeDetails}></UploadComponent>
              {stateUpdateProduct?.image && (
                <img src={stateUpdateProduct.image} style={{ width: '33px', height: '33px', marginLeft: '10px' }}></img>
              )}
            </Box>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '& .MuiButtonBase-root': {
                  ml: 1,
                  padding: '8px 16px',
                  fontSize: '1.2rem',
                  fontWeight: 600
                }
              }}
            >
              <Button
                disabled={
                  stateUpdateProduct.name &&
                  stateUpdateProduct.countInStock &&
                  stateUpdateProduct.description &&
                  stateUpdateProduct.discount &&
                  stateUpdateProduct.location &&
                  stateUpdateProduct.price &&
                  stateUpdateProduct.rating &&
                  stateUpdateProduct.sold &&
                  stateUpdateProduct.type &&
                  stateUpdateProduct.image
                    ? false
                    : true
                }
                variant="contained"
                type="submit"
                sx={{ backgroundColor: '#34495e' }}
              >
                Cập Nhật
              </Button>
            </Box>
          </form>
        </Box>
      </DrawerComponent>
    </Box>
  );
}

export default AdminProduct;
