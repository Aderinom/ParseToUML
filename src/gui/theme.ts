import { MantineTheme } from '@mantine/core';
import { DeepPartial } from 'util/DeepPartial';

const secondaryAccent = ['#EEFFF2', '#86FFA1', '#56E875', '#3FBF5A', '#17A736', '#009819', '#008607', '#006405', '#004B04', '#003903'];
const primaryAccent = ['#82FFFF', '#1CFFFF', '#00F6FF', '#15AABD', '#0098AD', '#008094', '#00606F', '#004853', '#00363E', '#00282F'];
const gradientAccent = ['#2eff5a', '#ff496b', '#10e4ff', '#2eff5a'];

const theme: DeepPartial<MantineTheme> = {
    primaryColor: '__primaryAccent',
};

export const darkTheme: DeepPartial<MantineTheme> = {
    colorScheme: 'dark',
    colors: {
        background: ['#C1C2C5', '#A6A7AB', '#909296', '#5C5F66', '#373A40', '#2C2E33', '#25262B', '#1A1B1E', '#141517', '#101113'], //Dark
        foreground: ['#FFFFFF', '#EDEDED', '#DDDDDD', '#CDCDCD', '#BFBFBF', '#B1B1B1', '#A5A5A5', '#999999', '#8F8F8F', '#858585'],
        primaryAccent: <any>primaryAccent,
        __primaryAccent: <any>primaryAccent,
        secondaryAccent: <any>secondaryAccent,
        __secondaryAccent: <any>secondaryAccent,
        gradientAccent: <any>gradientAccent,
    },
};

export const lightTheme: DeepPartial<MantineTheme> = {
    colorScheme: 'light',
    colors: {
        background: ['#858585', '#8F8F8F', '#999999', '#A5A5A5', '#B1B1B1', '#BFBFBF', '#CDCDCD', '#DDDDDD', '#EDEDED', '#FFFFFF'],
        foreground: ['#101113', '#141517', '#1A1B1E', '#25262B', '#2C2E33', '#373A40', '#5C5F66', '#909296', '#A6A7AB', '#C1C2C5'], //Dark
        primaryAccent: <any>Array.from(primaryAccent).reverse(),
        __primaryAccent: <any>primaryAccent,
        secondaryAccent: <any>Array.from(secondaryAccent).reverse(),
        __secondaryAccent: <any>secondaryAccent,
        gradientAccent: <any>gradientAccent,
    },
};
