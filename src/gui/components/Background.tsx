import { Box, createStyles } from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme) => {
    return {
        background: {
            top: 0,
            zIndex: -1,
            height: '100%',
            width: '100%',
            minWidth: '100vw',
            minHeight: '100vh',
            position: 'fixed',
            backgroundColor: theme.colors.background[5],
        },
    };
});

export default function Background() {
    const { classes } = useStyles();

    return <Box className={`${classes.background}`}></Box>;
}
