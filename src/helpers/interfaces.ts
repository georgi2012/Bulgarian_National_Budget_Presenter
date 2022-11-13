
export interface DataMapper {
    year: number;
    data: MainMapper[];
}

export interface MainMapper {
    title: string; //Национален бюджет
    data: SubtypeMapper[];
}

export interface SubtypeMapper {
    title: string; //"Приходи", "Разходи" /type
    value: number;
    subtype: TypeMapper[];
}

export interface TypeMapper {
    title: string;
    value: number;
    subdata: Subdata[];
}

export interface Subdata {
    name: string;
    value: number;
}