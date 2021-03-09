export const readJSON = async (path: string) => JSON.parse(await Deno.readTextFile(path));

export const writeJSON = async (path: string, data: any) =>
    Deno.writeTextFile(path, JSON.stringify(data,  null, 4))
