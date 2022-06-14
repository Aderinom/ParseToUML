declare module '*.svg' {
    interface SvgProps {
        fill?: string;
        stroke?: string;
    }

    const content: React.ElementType<SvgProps>;
    export default content;
}
