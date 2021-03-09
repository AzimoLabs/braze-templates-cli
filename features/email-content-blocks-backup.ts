import { appLogger } from '../lib/logger.ts';
import { brazeService } from '../lib/braze.ts';
import {
    BrazeMediaType,
    MapItem
} from '../lib/types.ts';
import { transformListIntoMap } from '../lib/transform-responses.ts';
import { writeJSON } from '../lib/file-io.ts';
import { BackupMediaType } from './backup-media-type.ts';

export class EmailContentBlocksBackup extends BackupMediaType {
    mediaType = BrazeMediaType.CONTENT_BLOCKS;

    async backupMap(): Promise<void> {
        appLogger.info('Downloading content blocks list');
        try {
            const listRaw = await brazeService.getContentBlocksList();
            const listTransformed = transformListIntoMap(listRaw, 'content_block_id', 'name');
            await writeJSON(this.MAP_PATH, listTransformed);
            appLogger.info('List saved');
        } catch (e) {
            appLogger.error('Could not update templates map. Error: ', e);
        }
    }

    async backupId(id: string, name?: string) {
        let itemName = name;
        if (!name) {
            const contentBlocksMap = await this.getMap();
            const itemDetails: MapItem = contentBlocksMap[id];
            itemName = itemDetails.name;
        }
        const template = await brazeService.getContentBlockDetails(id);
        await Deno.writeTextFile(`${this.CONTENT_PATH}/${itemName}.html`, template.content);
    }
}
