export type Item={
    text: string;
    done: boolean;
};

export type List ={
    id: number;
    name: string;
    items: Item[];
};