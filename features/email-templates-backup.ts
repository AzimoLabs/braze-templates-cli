import { appLogger } from '../lib/logger.ts';
import { brazeService } from '../lib/braze.ts';
import {
    BrazeMediaType,
    MapItem,
} from '../lib/types.ts';
import { transformListIntoMap } from '../lib/transform-responses.ts';
import { writeJSON } from '../lib/file-io.ts';
import { BackupMediaType } from './backup-media-type.ts';
import { ensureDirSync } from 'https://deno.land/std/fs/mod.ts';

export class EmailTemplatesBackup extends BackupMediaType {
    mediaType = BrazeMediaType.TEMPLATES;

    async backupMap(): Promise<void> {
        appLogger.info(`Downloading ${this.mediaType} list`);
        try {
            const listRaw = await brazeService.getTemplatesList();
            const listTransformed = transformListIntoMap(listRaw, 'email_template_id', 'template_name');
            await writeJSON(this.MAP_PATH, listTransformed);
            appLogger.info('List saved');
        } catch (e) {
            appLogger.error(`Could not update ${this.mediaType} map. Error: `, e);
        }
    }

    async backupId(id: string, name: string) {
        let itemName = name;
        if (!name) {
            const contentBlocksMap = await this.getMap();
            const itemDetails: MapItem = contentBlocksMap[id];
            itemName = itemDetails.name;
        }
        const template = await brazeService.getTemplateDetails(id);

        const bodyPath = `${this.CONTENT_PATH}/body`;
        const subjectPath = `${this.CONTENT_PATH}/subject`;
        ensureDirSync(bodyPath);
        ensureDirSync(subjectPath);

        await Deno.writeTextFile(`${bodyPath}/${itemName}.html`, template.body);
        await Deno.writeTextFile(`${subjectPath}/${itemName}.html`, template.subject);
    }
}
