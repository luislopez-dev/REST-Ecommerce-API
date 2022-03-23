export interface Product{

    name: string,
    brand: string,
    manufacturer: string,
    price: Number,
    description: string,
    ammount: Number,
    imgURL: string,
    _id: string,
    save(): void,
}