export interface BrazeConfig {
    'brazeApiUrl': string,
    'brazeTokenStaging': string,
    'brazeTokenProd': string,
    'production': boolean
}
const configRaw: any = JSON.parse(Deno.readTextFileSync('./config.json'));
export const config: BrazeConfig = configRaw;
