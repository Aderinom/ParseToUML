import { MantineProvider, Button, useMantineTheme, Box, createStyles, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useColorScheme, useHotkeys, useLocalStorage } from '@mantine/hooks';
import Background from 'gui/components/Background';

import { lightTheme, darkTheme } from 'gui/theme';
import React, { useState } from 'react';
import './src/gui/css/padding.css';

const Wrapper = ({ children }) => {
    const preferredColorScheme = useColorScheme();
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: 'mantine-color-scheme',
        defaultValue: preferredColorScheme,
        getInitialValueInEffect: true,
    });
    const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
    useHotkeys([['mod+J', () => toggleColorScheme()]]);
    console.log(colorScheme);
    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={colorScheme === 'dark' ? darkTheme : lightTheme}>
                <Background></Background>
                {children}
            </MantineProvider>
        </ColorSchemeProvider>
    );
};

export const wrapRootElement = ({ element }) => {
    return <Wrapper>{element} </Wrapper>;
};
