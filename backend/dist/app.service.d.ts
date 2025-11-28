export declare class AppService {
    getHealth(): {
        status: string;
        timestamp: string;
        service: string;
        version: string;
    };
    getInfo(): {
        name: string;
        description: string;
        version: string;
        modules: string[];
        documentation: string;
    };
}
