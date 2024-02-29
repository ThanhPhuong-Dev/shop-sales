import logo from '~/assets/img/logo.png';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge, Container, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AvatarComponent from '../AvatarComponent/AvatarComponent';
import TippyComponent from '../TippyComponent/TippyComponent';
import { useEffect, useState } from 'react';
import * as ProductService from '~/services/productService';
import UseDebounce from '~/utils/Debounce';
import Tippy from '@tippyjs/react/headless';
import formatNumber from '~/utils/formatNumber';
function HeaderComponent() {
  const [searchValue, setSearchValue] = useState('');
  const [resultSearch, setResultSearch] = useState([]);
  const [showResult, setShowResult] = useState(true);
  const orderProduct = useSelector((state) => state.order);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const hadnleClickUser = () => {
    navigate('/login');
  };
  const searchDebounce = UseDebounce(searchValue, 500);
  useEffect(() => {
    if (!searchDebounce.trim()) {
      return setResultSearch([]);
    }
    const fetchSearchProduct = async () => {
      const res = await ProductService.searchProduct(searchDebounce);
      setResultSearch(res);
    };
    fetchSearchProduct();
  }, [searchDebounce]);

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };
  const handleFocus = () => {
    setShowResult(true);
  };

  const onHide = () => {
    setShowResult(false);
    setSearchValue('');
  };
  return (
    <Box
      sx={{
        height: '70px',
        width: '100%',
        backgroundColor: '#34495e',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 1
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box onClick={() => navigate('/')}>
            <Box
              sx={{
                width: '70px',
                height: '70px',
                cursor: 'pointer',
                '& img': {
                  width: '100%',
                  height: '100%'
                }
              }}
            >
              <img src={logo}></img>
            </Box>
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              color: '#cca77f',
              fontFamily: 'Rubik Maps'
            }}
          >
            PHUONG
          </Typography>
        </Box>

        {/* search */}

        <TippyComponent resultSearch={resultSearch} handleHide={onHide} showResult={showResult}>
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              maxWidth: '50%',

              '& .MuiTextField-root': {
                bgcolor: 'white',
                outline: 'none',
                borderRadius: '5px 0 0 5px',
                fontSize: '2rem',
                '&:focus': {
                  outline: 'none',
                  border: 'none',
                  color: 'red'
                },

                '& .MuiInputLabel-root': {
                  color: '#95a5a6',
                  fontSize: '1.4rem'
                },
                '& .MuiInputBase-root': {
                  fontSize: '1.4rem'
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  color: 'blue',
                  border: '1px'
                }
              }
            }}
          >
            <TextField
              value={searchValue}
              size="small"
              fullWidth
              id="outlined-search"
              label="Search Product"
              type="search"
              onChange={handleSearch}
              onFocus={handleFocus}
            />
            <Button
              variant="contained"
              disableElevation
              sx={{
                bgcolor: '#f57224',
                color: 'white',
                borderRadius: '0 5px 5px 0',

                '&:hover': {
                  background: '#cca77f'
                },
                '& .MuiSvgIcon-root': {
                  fontSize: '2.5rem'
                }
              }}
            >
              <SearchIcon />
            </Button>
          </Box>
        </TippyComponent>
        {/* Action */}
        <Box
          sx={{
            flex: 1,
            maxWidth: '20%',
            display: 'flex',
            justifyContent: 'space-around',
            gap: 3
          }}
        >
          {user?.name ? (
            <AvatarComponent user={user}></AvatarComponent>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                border: '2px solid #95a5a6',
                px: 2,
                gap: 1,
                borderRadius: '10px',
                cursor: 'pointer',
                transition: '0.5s',

                '&:hover': {
                  background: '#cca77f'
                },
                '& .MuiSvgIcon-root': {
                  fontSize: '3rem',
                  color: 'white'
                },
                '& .MuiTypography-root': {
                  fontSize: '1.6rem',
                  color: 'white'
                }
              }}
            >
              <PersonIcon></PersonIcon>
              <Typography variant="inherit" onClick={hadnleClickUser}>
                Tài Khoản
              </Typography>
            </Box>
          )}

          {/* cartOrder */}
          <Tippy
            interactive={true}
            // visible={true}
            placement="top-start"
            trigger="mouseenter" // Đổi trigger thành "mouseenter"
            // onClickOutside={handleHide}
            render={(attrs) => (
              <div className="box" tabIndex="-1" {...attrs} style={{ width: '400px' }}>
                <Box
                  sx={{
                    position: 'relative', // Add position relative to make ::after position correctly
                    '::before': {
                      content: '""',
                      width: '60px',
                      height: '30px',
                      display: 'block',
                      position: 'absolute',
                      top: '-20px',
                      right: 0,
                      backgroundColor: 'transparent'
                    },
                    '::after': {
                      content: '""',
                      width: 0,
                      height: 0,
                      display: 'block',
                      position: 'absolute',
                      top: '-10px',
                      right: 0,
                      borderLeft: '15px solid transparent',
                      borderRight: '15px solid transparent',
                      borderBottom: '15px solid white',
                      zIndex: 4
                    }
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: 'white',
                      width: '100%',
                      maxHeight: 'min((100vh - 96px) - 60px, 734px)',
                      minHeight: '100px',
                      py: 1,
                      borderRadius: '8px',
                      boxShadow: '1px 1px 1px #ccc',
                      overflowY: 'auto'
                    }}
                  >
                    {orderProduct?.orderItems?.length > 0 ? (
                      <>
                        <Typography
                          sx={{ fontSize: '1.6rem', color: '#bdc3c7', textAlign: 'center', padding: '4px 0' }}
                        >
                          Sản phẩm trong giỏ hàng
                        </Typography>
                        {orderProduct?.orderItems?.map((order) => (
                          <Box
                            key={order.product}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              p: 1,
                              cursor: 'pointer',
                              ':hover': { background: '#ecf0f1' }
                            }}
                          >
                            <Box sx={{ width: '50px', height: '50px', mr: 1 }}>
                              <img
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                src={order.image}
                                alt=""
                              />
                            </Box>
                            <Box sx={{ width: '220px', overflow: 'hidden' }}>
                              <Typography sx={{ fontSize: '1.4rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {order.name}
                              </Typography>
                              <Typography sx={{ fontSize: '1.2rem', color: '#bdc3c7' }}>x{order.amount}</Typography>
                            </Box>
                            <Typography sx={{ fontSize: '1.4rem', color: 'red', flex: 1, textAlign: 'end' }}>
                              {formatNumber(order.price * order.amount)}đ
                            </Typography>
                          </Box>
                        ))}
                      </>
                    ) : (
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            '& .MuiSvgIcon-root': { fontSize: '6rem', mb: 2, color: '#d35400' },
                            ' & .MuiTypography-root': {
                              fontSize: '1.6rem'
                            }
                          }}
                        >
                          <LocalMallIcon></LocalMallIcon>
                          <Typography>Không có sản phẩm</Typography>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>
              </div>
            )}
          >
            <Box
              onClick={() => navigate('/order')}
              sx={{
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Badge
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '1.3rem',
                    fontWeight: 600
                  }
                }}
                badgeContent={orderProduct?.orderItems?.length}
                color="primary"
                max={99}
              >
                <ShoppingCartIcon
                  sx={{
                    fontSize: '3rem',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                ></ShoppingCartIcon>
              </Badge>
            </Box>
          </Tippy>
        </Box>
      </Container>
    </Box>
  );
}

export default HeaderComponent;
