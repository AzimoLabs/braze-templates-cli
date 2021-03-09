import { config } from './config.ts';
import {
    ContentBlockDetails,
    ContentBlockListItem,
    ContentBlockListResponse,
    TemplateDetails,
    TemplateListItem,
    TemplatesListResponse
} from './types.ts';
import { authorizedRequest } from './authorized-request.ts';

class BrazeService {
    async getTemplatesList(): Promise<TemplateListItem[]> {
        const uri = `${config.brazeApiUrl}/templates/email/list?limit=1000`;
        const response = await authorizedRequest<TemplatesListResponse>(uri);
        return response.templates;
    }

    async getContentBlocksList(): Promise<ContentBlockListItem[]> {
        const uri = `${config.brazeApiUrl}/content_blocks/list?limit=1000`;
        const response = await authorizedRequest<ContentBlockListResponse>(uri);
        return response.content_blocks;
    }

    async getTemplateDetails(id: string): Promise<TemplateDetails> {
        const uri = `${config.brazeApiUrl}/templates/email/info?email_template_id=${id}`;
        return await authorizedRequest<TemplateDetails>(uri);
    }

    async getContentBlockDetails(id: string): Promise<ContentBlockDetails> {
        const uri = `${config.brazeApiUrl}/content_blocks/info?content_block_id=${id}`;
        return await authorizedRequest<ContentBlockDetails>(uri);
    }
}

export const brazeService = new BrazeService();
