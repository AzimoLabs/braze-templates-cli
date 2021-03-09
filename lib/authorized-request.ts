import { config } from './config.ts';

const apiKey = config.production
    ? config.brazeTokenProd
    : config.brazeTokenSandbox;

export async function authorizedRequest<T>(uri: string): Promise<T> {
    const response = await fetch(uri, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    })
    const json = await response.json();
    return json as T;
}
