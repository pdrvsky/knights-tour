import React, { FunctionComponent } from "react";
import { Heading, Flex } from "rebass/styled-components";
import { ThemeProvider } from "styled-components";

import BoardWrapper from "./components/organisms/BoardWrapper";
import rebassTheme from "./components/rebassTheme";

const App: FunctionComponent = () => {
  return (
    <ThemeProvider theme={rebassTheme}>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width={1}
        sx={{
          p: 4,
          color: "text",
          bg: "background",
          fontFamily: "body",
          fontWeight: "body",
          lineHeight: "body",
          minHeight: "100vh"
        }}
      >
        <Heading as="h1" fontSize={6}>Knight's Tour</Heading>
        <BoardWrapper />
      </Flex>
    </ThemeProvider>
  );
};

export default App;
