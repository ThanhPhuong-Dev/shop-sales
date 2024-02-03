import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import LoadingComponent from '../LoadingComponent/LoadingComponent';

function TableComponent({ columns, dataProduct = [], getRowId, onRowClick }) {
  return (
    <>
      {<LoadingComponent time={2300}></LoadingComponent>}
      <Box sx={{ height: 400, width: '100%', mt: 4 }}>
        <DataGrid
          getRowId={getRowId}
          rows={dataProduct}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 }
            }
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowClick={onRowClick}
          sx={{
            fontSize: '1.5rem',
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 700
            }
          }}
        />
      </Box>
    </>
  );
}

export default TableComponent;
