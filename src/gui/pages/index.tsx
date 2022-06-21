import { Button, Container, Paper, Space, Textarea, Title } from '@mantine/core';
import { Parser } from 'controller/Parser/Parser';
import { UMLGenerator } from 'controller/UML/UMLGenerator';
import React, { useRef, useState } from 'react';

export default function LandingPage(): any {
    const textArea = useRef<HTMLTextAreaElement>(null);
    const [text, setText] = useState<false | string>(false);
    const [svg, setSVG] = useState<string | false>(false);
    const [working, setWorking] = useState<boolean>(false);
    const parser = new Parser();

    const onButtonClick = async (ev: React.MouseEvent) => {
        setWorking(true);
        if (textArea.current?.value) {
            try {
                const result = await parser.parse(textArea.current.value);
                console.log(result);
                const gen = new UMLGenerator();
                const res2 = await gen.generate(result);
                setSVG(res2);
                setText(JSON.stringify(result, undefined, 4));
            } catch (error: any) {
                setText('' + error);
            }
        }
        setWorking(false);
    };

    return (
        <Container>
            <Space h="xl" />
            <Paper shadow="sm" radius="md" p="xl">
                <Title>ParseToUML</Title>
                <Textarea placeholder="TextToParse" autosize variant="default" label="TextToParse" ref={textArea} />
                <Space h="md" />
                <Button fullWidth variant="outline" compact loading={working} onClick={onButtonClick}>
                    Parse!
                </Button>
                <Space h="md" />
                {svg ? <div dangerouslySetInnerHTML={{ __html: svg }}></div> : ''}
                <Space h="md" />
                <Textarea
                    disabled
                    placeholder="Output"
                    autosize
                    variant={text ? 'default' : 'filled'}
                    label="Output"
                    value={text ? text : ''}
                />
            </Paper>
            <Space h="xl" />
        </Container>
    );
}
