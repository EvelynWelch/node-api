export function getEnvironmentVariable(name: string): string {
    const value = process.env[name];
    
    const errorString = "utils.getEnviromentVariable() error: " +  name + " is not an in process.env[]"
    if(!value) {
        console.error(errorString)
        throw new Error("utils.getEnviromentVariable() error: enviroment variable not found in process.env[]");
    }
    return value;
}