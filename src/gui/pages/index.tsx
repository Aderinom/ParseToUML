import { AppShell, Container, Header, Input, Navbar, Paper, Space, Textarea, Title } from '@mantine/core';
import React from 'react';

export default function LandingPage(): any {
    return (
        <Container>
            <Space h="xl" />
            <Paper shadow="sm" radius="md" p="xl">
                <Title>ParseToUML</Title>
                <Textarea placeholder="TextToParse" label="TextToParse" />
                <Textarea placeholder="TextToParse" label="TextToParse" />
            </Paper>
        </Container>
    );
}
