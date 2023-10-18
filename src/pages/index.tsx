import {
  Button,
  Container,
  Group,
  Paper,
  Space,
  Stack,
  Textarea,
  Title,
} from "@mantine/core";

import React, { useRef, useState } from "react";
import { LogicParser } from "../utility/Parser/LogicParser";
import { Parser } from "../utility/Parser/Parser";
import { UMLGenerator } from "../utility/UMLGenerator";

// TODO : add Comments to explain relationships. f.e. test & a; // Pushes data to;
// TODO : add way to add text and explain objects
// TODO : add alternative generator which generates multiple objects if they could be connected;
//

const default_text = `class upd_sockets {
  ipAddr addr;
}

class host {
  socket sockets[10];
  upd_sockets sockets[10];
}

class  socket
{
  stream streams[10];
  stream_priotizer prio;
}

class stream_priotizer
{
  stream & streams [10];
}

class stream
{
  recv_queue_i recv_buffer;
  send_queue_i send_buffer;
}


class recv_queue_i extends queue_i{}
class send_queue_i extends queue_i{}

class recv_queue extends recv_queue_i 
{
  uint8 buffer[1024];
}

class send_queue extends send_queue_i 
{
  uint8 buffer[1024];
}`;

export default function ParserPage(): any {
  const textArea = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState<false | string>(false);
  const [svg, setSVG] = useState<String | false>(false);
  const [working, setWorking] = useState<boolean>(false);
  const imgDiv = useRef<HTMLDivElement>(null);

  const onButtonClick = async (ev: React.MouseEvent) => {
    const parser = new Parser();
    const logParse = new LogicParser();
    const gen = new UMLGenerator();

    setWorking(true);
    if (textArea.current?.value) {
      try {
        const parserResult = await parser.parse(textArea.current.value);
        console.log(parserResult);
        const logicResult = logParse.parse(parserResult);
        console.log(logicResult);
        const svgResult = await gen.generate(logicResult);
        imgDiv.current?.replaceChildren(svgResult);
        console.log(svgResult);
        setText(JSON.stringify(logicResult, undefined, 4));
      } catch (error: any) {
        setText("" + error);
      }
    }
    setWorking(false);
  };

  return (
    <Container size={"xl"}>
      <Space h="xl" />
      <Paper shadow="sm" radius="md" p="xl">
        <Title>ParseToUML</Title>
        <Group>
          <Textarea
            placeholder="TextToParse"
            variant="default"
            label="TextToParse"
            ref={textArea}
            defaultValue={default_text}
            autosize
            w={"600px"}
          />
          <Stack>
            <Stack />
            <div ref={imgDiv}></div>
          </Stack>
        </Group>
        <Space h="md" />
        <Button
          fullWidth
          variant="outline"
          loading={working}
          onClick={onButtonClick}
        >
          Parse!
        </Button>
        <Space h="md" />
        <Textarea
          disabled
          placeholder="Output"
          autosize
          variant={text ? "default" : "filled"}
          label="Output"
          value={text ? text : ""}
          w={"600px"}
        />
      </Paper>
      <Space h="xl" />
    </Container>
  );
}
