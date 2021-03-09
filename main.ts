import Denomander from 'https://deno.land/x/denomander/mod.ts';
import ProgressBar from 'https://deno.land/x/progress@v1.1.4/mod.ts';

import { appLogger } from './lib/logger.ts';
import { EmailTemplatesBackup } from './features/email-templates-backup.ts';
import { BrazeMediaType } from './lib/types.ts';
import { EmailContentBlocksBackup } from './features/email-content-blocks-backup.ts';
import { BackupMediaType } from './features/backup-media-type.ts';

const program = new Denomander({
    app_name: "Email templates backup",
    app_description: "Simple tool to backup and update email templates and content block in Braze",
    app_version: "1.0.0"
});

const contentBlocksBackup = new EmailContentBlocksBackup();
const templatesBackup = new EmailTemplatesBackup();

const BACKUP_MEDIA_TYPE = new Map<BrazeMediaType, BackupMediaType>([
    [templatesBackup.mediaType, templatesBackup],
    [contentBlocksBackup.mediaType, contentBlocksBackup]
]);

function isBrazeMediaType(commandParam: unknown): commandParam is BrazeMediaType {
    const possibleValues: string[] = Object.values(BrazeMediaType);
    return typeof commandParam === 'string' && possibleValues.includes(commandParam);
}

program
    .command('backup [type]', 'Backup media type from Braze')
    .option('-l, --list-only', 'Backup only list of objects and save as map')
    .option('-i, --id', 'Specific id')
    .action(async (params: any) => {
        const type: unknown = params.type;
        const listOnly = program['list-only'];
        const itemId = program.id;
        const possibleValues = Object.values(BrazeMediaType);
        if (!!itemId && typeof itemId !== 'string') {
            appLogger.error('Invalid argument "id". Target id expected.');
            return;
        }

        if (isBrazeMediaType(type)) {
            const backupMedia = BACKUP_MEDIA_TYPE.get(type);
            appLogger.info(`Backup ${type} map`);
            await backupMedia?.backupMap();
            if (listOnly) { return; }

            const total = await backupMedia?.getItemsCount();
            const bar = new ProgressBar({ total });
            let completed = 0;

            if (itemId) {
                await backupMedia?.backupId(itemId);
                return;
            }

            appLogger.info(`Backing up all ${type} data`);
            await backupMedia?.backupAll(() => {
                bar.render(completed++);
            });

        } else {
            appLogger.error(`Unknown media type: ${type}. Possible values: ${possibleValues.join()}`);
        }
    })

program.parse(Deno.args);
