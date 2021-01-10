import { useEffect, useState } from 'react';
import { fetchProducts, saveOrder } from '../api';
import OrderLocation from './OrderLocation';
import ProductsList from './ProductsList';
import StepsHeader from './StepsHeader';
import { OrderLocationData, Product } from './types';
import OrderSummary from './OrderSummary'
import Footer from '../Footer';
import { checkIsSelected } from './helpers';
import { toast } from 'react-toastify'
function Orders() {

    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [orderLocation, setOrderLocation] = useState<OrderLocationData>();
    const totalPrice = selectedProducts.reduce((sum, item) => {
        return sum + item.price
    }, 0)
    console.log(products)
    useEffect(() => {
        fetchProducts()
            .then(response => setProducts(response.data))
            .catch(error => toast.warning('Erro ao listar produtos!'))
    }, [])

    const handleSelectProduct = (product: Product) => {
        const isAlreadySelected = checkIsSelected(selectedProducts, product);

        if (isAlreadySelected) {
            const selected = selectedProducts.filter(item => item.id !== product.id);
            setSelectedProducts(selected);
        } else {
            setSelectedProducts(previous => [...previous, product]);
        }
    }
    const handleSubmit = () => {
        const productsIds = selectedProducts.map(({ id }) => ({ id }));
        const payload = {
            ...orderLocation!,
            products: productsIds
        }

        saveOrder(payload)
        .then((response) => {
            toast.error(`Pedido enviado com sucesso! Nº ${response.data.id}`);
            setSelectedProducts([]);
        })
            .catch(() => {
                toast.warning('Erro ao enviar pedido');
            })
    }
    return (
        <>
            <div className="orders-container">
                <StepsHeader />
                <ProductsList
                    onSelectProduct={handleSelectProduct}
                    selectedProducts={selectedProducts}
                    products={products} />
                <OrderLocation onChangeLocation={location => setOrderLocation(location)} />
                <OrderSummary onSubmit={handleSubmit} amount={selectedProducts.length} totalPrice={totalPrice} />
            </div>
            <Footer />
        </>
    );
}

export default Orders;