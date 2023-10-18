import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Routes } from "./router";

export default function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Routes />
    </MantineProvider>
  );
}
