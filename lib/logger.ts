import * as log from 'https://deno.land/std@0.84.0/log/mod.ts';

await log.setup({
    handlers: {
        console: new log.handlers.ConsoleHandler('DEBUG')
    },
    loggers: {
        default: {
            level: 'DEBUG',
            handlers: ['console'],
        }
    },
});

export const appLogger = log.getLogger();
