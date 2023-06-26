declare module '*.svg' {
    const content: any;
    export default content;
}

declare module '*.sass' {
    const content: {
        a: string
        b: string
        c: string
    };
    export default content;
}