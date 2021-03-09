import { config } from '../lib/config.ts';
import { BrazeMediaType, MapItem, StringKeyedObject } from '../lib/types.ts';
import { readJSON } from '../lib/file-io.ts';
import { ensureDirSync } from 'https://deno.land/std/fs/mod.ts';

export abstract class BackupMediaType {
    static BASE_BACKUP_PATH = `./backup/${config.production ? 'production' : 'staging'}`;
    static SLEEP_TIME_MS = 200;

    public abstract readonly mediaType: BrazeMediaType;

    get MAP_PATH(): string {
        ensureDirSync(BackupMediaType.BASE_BACKUP_PATH);
        return `${BackupMediaType.BASE_BACKUP_PATH}/${this.mediaType}-map.json`
    }

    get CONTENT_PATH(): string {
        const path = `${BackupMediaType.BASE_BACKUP_PATH}/${this.mediaType}`;
        ensureDirSync(path);
        return path;
    }

    abstract backupMap(): Promise<void>;
    abstract backupId(id: string, name?: string): Promise<void>;

    async getItemsCount(): Promise<number> {
        const itemsMap = await this.getMap();
        return Object.keys(itemsMap).length;
    }

    async backupAll(eachHandler: () => void): Promise<void> {
        const contentBlocksMap = await this.getMap();
        for (const id of Object.keys(contentBlocksMap)) {
            const name = contentBlocksMap[id].name;
            await this.backupId(id, name);
            await BackupMediaType.sleep();
            eachHandler();
        }
    };

    static async sleep(ms = BackupMediaType.SLEEP_TIME_MS) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    async getMap(): Promise<StringKeyedObject<MapItem>> {
        return readJSON(this.MAP_PATH);
    }
}
