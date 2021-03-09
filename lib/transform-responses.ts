import {
    MapItem,
    StringKeyedObject
} from './types.ts';

export function transformListIntoMap<T>(
    list: T[],
    idProperty: keyof T,
    nameProperty: keyof T
): StringKeyedObject<MapItem> {
    return list.reduce((aggr: StringKeyedObject<MapItem>, item: T) => {
        const id = item[idProperty] as unknown as string;
        const name = (item[nameProperty] as unknown as string).replace(/\//g, '-');
        aggr[id] = {
            id,
            name
        };
        return aggr;
    }, {});
}
