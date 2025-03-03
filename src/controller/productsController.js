import productModel from "../models/product.model.js";

export const getProducts = async (req,res) => 
{
    try 
    {
        const { limit, page, metFilter, filter, metOrder, order } = req.query;

        const pag = page !== undefined ? page : 1;
        const lim = limit !== undefined ? limit : 10; 
        const filterQuery = metFilter !== undefined ? { [metFilter]: filter}: {};
        const orderQuery = metOrder !== undefined ? {[metOrder]: order} : {};
        
        const products = await productModel.paginate(filterQuery, {limit: lim, page: pag, sort: orderQuery, lean: true});

        products.pageNumber = Array.from({length: products.totalPages}, (_, i) => (
        {
            number: i + 1,
            isCurrent: i + 1 === products.page
        }));
        
        res.status(200).send(products);
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).send(error);
    }
}

export const getProduct = async (req,res) => 
{
    try 
    {
        const idProd = req.params.pid;
        const prod = await productModel.findById(idProd);
        if(prod)
            res.status(200).send(prod);
        else
            res.status(404).send({message: "Product non-existent"});
    } 
    catch (error) 
    {
        res.status(500).send(error);
    }
}

export const createProduct = async (req,res) => 
{
    try 
    {
        const {title, description, category, code, price, stock} = req.body;
        const message = await productModel.create({
            title,
            description, 
            category,
            code,
            price,
            stock
        });
        res.status(201).send({message: message});
    } 
    catch (error) 
    {
        res.status(500).send(error);
    }
}

export const updateProduct = async (req,res) => 
{
    try 
    {
        const idProd = req.params.pid;
        const {title, description, category, code, price, stock} = req.body;
        const message = await productModel.findByIdAndUpdate(idProd, {title, description, category, code, price, stock});
        console.log(message);
        if(message) 
            res.status(200).send({message: "Product updated"});
        else
            res.status(404).send({message: "Product non-existent"});
    }    
    catch (error) 
    {
        res.status(500).send(error);
    }
}

export const deleteProduct = async (req,res) => 
{
    try 
    {
        const idProd = req.params.pid;
        const message = await productModel.findByIdAndDelete(idProd);
        console.log(message);

        if(message) 
            res.status(200).send({message: "Product eliminated"});
        else
            res.status(404).send({message: "Product non-existent"})
    }   
    catch (error) 
    {
        res.status(500).send(error);
    }
}