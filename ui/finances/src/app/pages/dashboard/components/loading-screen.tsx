import React from 'react';
import { CircularProgress, Stack, Typography } from '@mui/material';

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 bg-white bg-opacity-90 z-50 flex items-center justify-center">
            <Stack spacing={2} alignItems="center">
                <CircularProgress size={60} />
                <Typography variant="h6" color="text.secondary">
                    Loading your finances...
                </Typography>
            </Stack>
        </div>
    );
}