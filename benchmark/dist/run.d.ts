export declare function run<T>(testData: {
    name: string;
    data: T;
}[], libraries: {
    [name: string]: (data: T) => void;
}): void;
