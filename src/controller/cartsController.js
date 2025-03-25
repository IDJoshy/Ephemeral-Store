import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
import ticketModel from "../models/ticket.model.js";

export const getCart =  async(req,res) => 
{
    try 
    {
        const cartId = req.params.cid;
        const cart = await cartModel.findOne({_id: cartId});
        if(cart)
            res.status(200).send(cart);
        else
            res.status(404).send("Cart not found");
    } 
    catch (error) 
    {
        res.status(500).send(error);
    }
}

export const insertProductCart =  async(req,res) => 
{
    try 
    {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const {quantity} = req.body;
        const cart = await cartModel.findOne({_id: cartId});

        if(cart) 
        {
            const product = await productModel.findById(productId);
            if(product) 
            {
                if(product.stock >= quantity) 
                {
                    const indice = cart.products.findIndex(prod => prod._id == productId);

                    if(indice != -1) 
                    {
                        cart.products[indice].quantity = quantity;
                    } 
                    else 
                    {
                        cart.products.push({id_prod: productId, quantity: quantity});
                    }
                    
                    await cartModel.findByIdAndUpdate(cartId, cart);
                    res.status(200).send("Cart updated");
                } 
                else 
                {
                    res.status(400).send("Not enough stock");
                }
                
            } 
            else 
            {
                res.status(404).send("Product non existent");
            }
        } 
        else 
        {
            res.status(404).send("Cart non existent");
        }
    } 
    catch (error) 
    {
        res.status(500).send(error);
    }
}

export const deleteProductCart =  async(req,res) => 
{
    try 
    {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const cart = await cartModel.findOne({_id: cartId});

        if(cart) 
        {
            const indice = cart.products.findIndex(prod => prod._id == productId);
            if(indice != -1) 
            {
                cart.products.splice(indice, 1);
                cart.save();
                res.status(200).send(cart);
            } 
            else 
            {
                res.status(404).send("Product not found in cart");
            }
            
        }
        else 
        {
            res.status(404).send("Cart not found");
        }
    } 
    catch (e) 
    {
        res.status(500).send(e);
    }
}

export const deleteCart =  async(req,res) => 
{
    try 
    {
        const cartId = req.params.cid;
        const cart = await cartModel.findOne({_id: cartId});
        if(cart) 
        {
            cart.products = [];
            cart.save();
            res.status(200).send(cart);
        } 
        else 
        {
            res.status(404).send("Cart not found");
        }
            
    }
    catch (error) 
    {
        res.status(500).send(error)
    }
}

export const checkout =  async(req,res) =>
{
    try 
    {
        const cartId = req.params.cid;
        const cart = await cartModel.findById(cartId);
        const productStockNull = [];

        if(cart)
        {
            for (const prod of cart.products)
            {
                const product = await productModel.findById(prod.id_prod);
                
                if(!product) return res.status(404).send("Product not found");
                
                if(product.stock - prod.quantity < 0)
                {
                    productStockNull.push(product.id);
                }
            }

            if (productStockNull.length === 0)
            {
                let totalAmount = 0;

                for (const prod of cart.products)
                {
                    const product = await productModel.findById(prod.id_prod);

                    if(product)
                    {
                        product.stock -= prod.quantity;
                        totalAmount += prod.price * prod.quantity;
                        await product.save();
                    }

                }

                const ticket = await ticketModel.create(
                {
                    code: crypto.randomUUID(),
                    purchaser: req.user.email,
                    amount: totalAmount,
                    products: cart.products
                });
                
                console.log(ticket);
                await cartModel.findByIdAndUpdate(cartId, {products: []});
                res.status(200).json({message: "Purchase successful"});

            }
            else
            {
                productStockNull.forEach((prodId) => {
                    let index = cart.products.findIndex(prod => prod.id_prod == prodId);
                    cart.products.splice(index, 1);
                });
                await cartModel.findByIdAndUpdate(cartId, {products: cart.products});
                res.status(400).send("Products out of stock " + productStockNull);
            }
        }
        else
        {
            res.status(404).send("Cart not found");
        }
    }
    catch (error) 
    {
        res.status(500).send(error);
    }
};