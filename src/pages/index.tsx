import {
  Container,
  Group,
  Paper,
  Space,
  Stack,
  Textarea,
  Title,
} from "@mantine/core";

import { useEffect, useMemo, useRef, useState } from "react";
import { FullClassDefinition, LogicParser } from "../utility/Parser/LogicParser";
import { Parser } from "../utility/Parser/Parser";
import { UMLGenerator } from "../utility/UMLGenerator";
import { useDebounceCallback } from "@mantine/hooks";

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

const parser = new Parser();
const logParse = new LogicParser();
const gen = new UMLGenerator();

export default function ParserPage(): any {
  const textArea = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState<false | string>(false);
  const imgDiv = useRef<HTMLDivElement>(null);

  const updateSvg = async () => {
    if (textArea.current?.value) {
      try {
        const parserResult = await parser.parse(textArea.current.value);
        console.log(parserResult);
        const logicResult = logParse.parse(parserResult);
        console.log(logicResult);
        const svgResult: HTMLDivElement = await gen.generate(logicResult);
        svgResult.style.minWidth = "600px"
        imgDiv.current?.replaceChildren(svgResult);
        console.log(svgResult);
        setText(JSON.stringify(logicResult, ((key, val)=>{
          // Fix issues with circular dependencies
          if(key === "ref") {
            const isRef : FullClassDefinition | Object = val;
            if("name" in isRef){
              return `[${isRef.name}]`
            }
            return "[ref: ?]"
          }
          return val
        }), 4));
      } catch (error: any) {
        console.error(error)
        setText("" + error);
      }
    }else {
      imgDiv.current?.replaceChildren()
      setText("");
    }
  };

  const debounceChange = useDebounceCallback(() => void updateSvg(), 100);

  useEffect(()=>{void updateSvg()},[])

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
            spellCheck={false}
            autosize
            onChange={(e) => void debounceChange()}
            w={"600px"}
          />
          <Stack>
            <div style={{filter:"invert(0.9) sepia(60%) hue-rotate(180deg)"}} ref={imgDiv}></div>
          </Stack>
        </Group>
        <Space h="md" />
        <Textarea
          disabled
          placeholder="Parser Output"
          autosize
          variant={text ? "default" : "filled"}
          label="Output"
          value={text ? text : ""}
        />
      </Paper>
      <Space h="xl" />
    </Container>
  );
}
