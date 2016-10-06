
export declare function main(): Promise<any>;
export declare class App {
    moduleRef: any;
    bodyTemplate: string;
    private _isRunning;
    constructor(oldApp?: App);
    isRunning(): boolean;
    start(): void;
    stop(): void;
    restart(): void;
}
