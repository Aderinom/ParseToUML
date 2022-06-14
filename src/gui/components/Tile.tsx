import { Container, createStyles, useMantineTheme } from '@mantine/core';
import React from 'react';

const BREAKPOINT = '@media (max-width: 755px)';

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        boxSizing: 'border-box',
        backgroundColor: theme.colors.background[9],
    },

    inner: {
        position: 'relative',
        paddingTop: 200,
        paddingBottom: 120,

        [BREAKPOINT]: {
            paddingBottom: 80,
            paddingTop: 80,
        },

        '*': {
            height: 54,
            paddingLeft: 38,
            paddingRight: 38,

            [BREAKPOINT]: {
                height: 54,
                paddingLeft: 18,
                paddingRight: 18,
                flex: 1,
            },
        },
    },
}));

export function Tile({ style, children }) {
    const { classes, cx } = useStyles();
    const theme = useMantineTheme();

    return (
        <div className={classes.wrapper}>
            <Container size={700} style={style} className={classes.inner}>
                {children}
            </Container>
        </div>
    );
}
