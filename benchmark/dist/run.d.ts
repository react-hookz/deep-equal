export declare function run<T>(testData: Array<{
    name: string;
    data: T;
}>, libraries: Record<string, (data: T) => void>): void;
