export enum Region { European, American, Asian }

export interface Seller {
    name: string;
    id: number;
    region?: Region;
}
