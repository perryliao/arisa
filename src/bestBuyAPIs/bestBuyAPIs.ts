import Axios from "axios";

const searchURLA: string = "https://bizhacks.bbycastatic.ca/mobile-si/si/v3/products/search?query=";
const searchURLB: string = "&storeId=&zipCode=&facetsOnly=&platform=&lang=en";

/**
 * Query the public BestBuy search api to return a list of products.
 *
 * Parses the information we want.
 *
 * @param search
 */
export async function searchProducts(search: string): Promise<IProductInterfaces> {
    console.log("search:", search);
    try {
        let res: any = await Axios.get(searchURLA + search + searchURLB);
        res = res.data.searchApi.documents;

        console.log("res documents:", res);

        const products: IProductInterfaces = {};

        let i: number;
        for(i = 0; i < res.length; i++) {
            const current: any = res[i];
            if (!products[current.skuId]) {
                products[current.skuId] = {
                    name: current.summary.names.short,
                    description: current.summary.meta.description,
                    price: current.priceBlock.itemPrice.regularPrice,
                    imageURL: current.summary.media.primaryImage.url,
                };
            }
        }

        return products;

    } catch (err) {
        console.log("err:", err);
        return {
            well: {
                name: "error",
                description: "error",
                price: "error",
                imageURL: "error",
            }
        };
    }
}

export interface IProductInterface {
    name: string;
    description: string;
    price: string;
    imageURL: string;
}

export interface IProductInterfaces {
    [id: string]: IProductInterface;
}
