import { useState } from 'react';
import { Stepper, Step, StepLabel, Typography } from '@mui/material';

import PaymentsIcon from '@mui/icons-material/Payments';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

function StepperComponent() {
  return (
    <Stepper
      alternativeLabel
      sx={{
        '& .MuiStepConnector-root': {
          position: 'absolute',
          top: '20px',
          left: 'calc(-50% + 24px)',
          right: 'calc(50% + 24px)',
          '& .MuiStepConnector-line': {
            borderStyle: 'solid',
            borderWidth: '5px',
            background: 'linear-gradient(to right, #2c3e50, #cca77f)'
          }
        },

        '& .MuiSvgIcon-root': {
          fontSize: '5rem',
          padding: '10px',
          backgroundColor: '#2c3e50',
          borderRadius: '50%',
          color: '#cca77f'
        },
        '& .MuiTypography-root': {
          fontSize: '1.4rem',
          color: '#2c3e50'
        },

        // CSS riêng cho biểu tượng của bước thứ 2
        '& .step-2-icon': {
          backgroundColor: '#cca77f',
          color: '#2c3e50'
        }
      }}
    >
      <Step key="Step 1">
        <StepLabel className="step-label" icon={<PaymentsIcon></PaymentsIcon>}>
          <Typography>Phương Thức Thanh Toán</Typography>
        </StepLabel>
      </Step>
      <Step key="Step 2">
        <StepLabel className="step-label" icon={<LocalShippingIcon className="step-2-icon"></LocalShippingIcon>}>
          <Typography>Đang Vận Chuyển</Typography>
        </StepLabel>
      </Step>
      <Step key="Step 3">
        <StepLabel className="step-label" icon={<LocalAtmIcon></LocalAtmIcon>}>
          <Typography>Nhận Hàng</Typography>
        </StepLabel>
      </Step>
    </Stepper>
  );
}

export default StepperComponent;
