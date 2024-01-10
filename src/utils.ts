export function getEnvironmentVariable(name: string): string {
    // const value = process.env[name];
    const value = '1'
    if(!value) {
        throw new Error(`Missing required environment variable "${name}"`);
    }
    return value;
}