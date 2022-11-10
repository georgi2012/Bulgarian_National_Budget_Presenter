
export interface DataMapper {
    year: number;
    data: MainMapper[];
}

export interface MainMapper {
    title: string; //Национален бюджет
    data: SubtypeMapper[];
}

export interface SubtypeMapper {
    type: string; //"Приходи", "Разходи"
    subtype: TypeMapper[];
}

export interface TypeMapper {
    type: string;
    value: number;
    subdata: Subdata[];
}

export interface Subdata {
    name: string;
    value: number;
}