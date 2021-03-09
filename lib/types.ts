export interface TemplateListItem {
    email_template_id: string;
    template_name: string;
    created_at: Date;
    updated_at: Date;
    tags: string[];
}

export interface TemplateDetails {
    email_template_id: string;
    template_name: string;
    description: string;
    subject: string;
    preheader: string;
    body: string;
    plaintext_body?: any;
    should_inline_css: boolean;
    tags: string[];
    created_at: Date;
    updated_at: Date;
    message: string;
}

export interface TemplatesListResponse {
    count: number;
    templates: TemplateListItem[];
    message: string;
}

export interface MapItem {
    id: string;
    name: string;
}

export interface ContentBlockDetails {
    content_block_id: string;
    name: string;
    content: string;
    description: string;
    content_type: string;
    created_at: Date;
    last_edited: Date;
    tags: string[];
    inclusion_count: number;
    message: string;
}

export interface ContentBlockListItem {
    content_block_id: string;
    name: string;
    created_at: Date;
    last_edited: Date;
    content_type: string;
    inclusion_count: number;
    liquid_tag: string;
    tags: string[];
}

export interface ContentBlockListResponse {
    count: number;
    content_blocks: ContentBlockListItem[];
    message: string;
}

export type StringKeyedObject<A> = { [key: string]: A };

export enum BrazeMediaType {
    TEMPLATES = 'templates',
    CONTENT_BLOCKS = 'content-blocks'
}
