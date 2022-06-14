import { Tuple } from '@mantine/core';

type CustomColors =
    | 'background'
    | 'foreground'
    | 'primaryAccent'
    | '__primaryAccent'
    | 'secondaryAccent'
    | '__secondaryAccent'
    | 'gradientAccent';

declare module '@mantine/core' {
    export interface MantineThemeColorsOverride {
        colors: Record<CustomColors, Tuple<string, 10>>;
    }
}
