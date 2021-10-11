import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function Loader() {
    return (
        <Box sx={{ overflow: 'hidden' }}>
            <Grid sx={{ overflow: 'hidden' }}>
                <Skeleton sx={{ height: 100 }} />
                <Skeleton sx={{ height: 140 }} animation="wave" variant="rectangular" />
                <Skeleton sx={{ height: 100 }} />
                <Skeleton sx={{ height: 140 }} animation="wave" variant="rectangular" />
                <Skeleton sx={{ height: 100 }} />
                <Skeleton sx={{ height: 140 }} animation="wave" variant="rectangular" />
            </Grid>
        </Box>
    );
}
