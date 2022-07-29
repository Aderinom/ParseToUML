import { Button, Container, Paper, Space, Textarea, Title } from '@mantine/core';
import { LogicParser } from 'controller/Parser/LogicParser';
import { Parser } from 'controller/Parser/Parser';
import { UMLGenerator } from 'controller/UML/UMLGenerator';
import { default_text } from 'gui/etc/default_text';
import React, { useRef, useState } from 'react';

// TODO : add Comments to explain relationships. f.e. test & a; // Pushes data to;
// TODO : add way to add text and explain objects
// TODO : add alternative generator which generates multiple objects if they could be connected;
//

export default function LandingPage(): any {
    const textArea = useRef<HTMLTextAreaElement>(null);
    const [text, setText] = useState<false | string>(false);
    const [svg, setSVG] = useState<string | false>(false);
    const [working, setWorking] = useState<boolean>(false);
    const parser = new Parser();
    const logParse = new LogicParser();
    const gen = new UMLGenerator();

    const onButtonClick = async (ev: React.MouseEvent) => {
        setWorking(true);
        if (textArea.current?.value) {
            try {
                const parserResult = await parser.parse(textArea.current.value);
                console.log(parserResult);
                const logicResult = logParse.parse(parserResult);
                console.log(logicResult);
                const umlResult = await gen.generate(logicResult);

                setSVG(umlResult);
                setText(JSON.stringify(logicResult, undefined, 4));
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
                <Textarea
                    placeholder="TextToParse"
                    autosize
                    variant="default"
                    label="TextToParse"
                    ref={textArea}
                    defaultValue={default_text}
                />
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
