# UML (like) Generator
[![Deploy](https://github.com/Aderinom/ParseToUML/actions/workflows/build-and-deploy-to-pages.yml/badge.svg)](https://github.com/Aderinom/ParseToUML/actions/workflows/build-and-deploy-to-pages.yml)
![](https://github.com/Aderinom/ParseToUML/blob/main/etc/Animation.gif)

See : https://aderinom.github.io/ParseToUML/

Small static site that generates a UML like graph from C++ like class declarations.
Mostly created this since I wanted to play with 'nearly', a parser generator.

## Tech used
- Vite, React, Mantine  | for the frontend
- Nearley, Moo          | for text parsing  
  I'd reccomend PeggyJS instead - easier to use, syntax is more concise, better flexibility
- Viz-Js                | for Graph generation
- Eslint                | for Linting


# Starting in dev

```
pnpm i 
pnpm dev
```

# Building

```
pnpm run build
```