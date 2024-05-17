import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
    const { id } = req.query;
    const url = `https://jp.mercari.com/item/${id}`;

    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const productImage = $('meta[property="og:image"]').attr('content');
        const productName = $('meta[property="og:title"]').attr('content');
        const productPrice = $('span[data-testid="price"]').text();
        const isSoldOut = $('div[data-testid="sold-out-label"]').length > 0;

        const productInfo = {
            id,
            mainImage: productImage,
            name: productName,
            price: productPrice,
            sold: isSoldOut,
        };

        res.status(200).json(productInfo);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching product information');
    }
}
