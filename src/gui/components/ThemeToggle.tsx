import { Box, Center, Group, SegmentedControl, useMantineColorScheme } from '@mantine/core';
import React from 'react';
import { Moon, Sun } from 'tabler-icons-react';

export function ThemeToggle() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        <Group my="xl">
            <SegmentedControl
                value={colorScheme}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                onChange={toggleColorScheme}
                data={[
                    {
                        value: 'light',
                        label: (
                            <Center>
                                <Sun size={16} />
                                <Box ml={10}>Light</Box>
                            </Center>
                        ),
                    },
                    {
                        value: 'dark',
                        label: (
                            <Center>
                                <Moon size={16} />
                                <Box ml={10}>Dark</Box>
                            </Center>
                        ),
                    },
                ]}
            />
        </Group>
    );
}
