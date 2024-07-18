import React, { createContext, useState, useEffect } from 'react';
import { ApolloProvider, useMutation, useQuery } from '@apollo/client';
import client from '../client/client';
import { GET_PRODUCTS, ADD_USER, ADD_ORDER, ADD_ORDER_PRODUCT } from '../Apollo/queries';

export const ProductContext = createContext();
export const UserContext = createContext();
export const OrderContext = createContext();

const ProductProvider = ({ children }) => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!loading && !error && data) {
      setProducts(data.product);
    }
  }, [loading, error, data]);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [addUserMutation] = useMutation(ADD_USER);

  const addUser = async (username, email, password, address, phone) => {
    try {
      const { data } = await addUserMutation({
        variables: { username, email, password, address, phone },
      });
      setUsers(data.addUser);
    } catch (err) {
      if (err.graphQLErrors) {
        err.graphQLErrors.forEach(({ message, locations, path }) => {
          console.error(`GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`);
        });
      }
      if (err.networkError) {
        console.error('Network error:', err.networkError);
      }
      console.error('Failed to add user', err);
    }
  };

  return (
    <UserContext.Provider value={{ users, addUser }}>
      {children}
    </UserContext.Provider>
  );
};

const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [placeOrderMutation] = useMutation(ADD_ORDER);
  const [addOrderProductMutation] = useMutation(ADD_ORDER_PRODUCT);

  const placeOrder = async (orderData) => {
    try {
      const { data: orderDataResult } = await placeOrderMutation({
        variables: {
          quantity: orderData.quantity,
          total_price: orderData.total_price,
          image: orderData.image,
          kurir: orderData.kurir,
          Date: orderData.Date,
          id_user: orderData.id_user,
        },
      });
  
      const newOrder = orderDataResult.insert_order.returning[0];
      const orderId = newOrder.order_id;
  
      // Ensure orderData.products is defined and an array before mapping
      if (orderData.products && Array.isArray(orderData.products)) {
        const orderProductData = orderData.products.map((product) => ({
          order_id: orderId,
          product_id: product.id,
        }));
  
        // Insert order-product relationships
        await Promise.all(
          orderProductData.map(async (orderProduct) => {
            await addOrderProductMutation({
              variables: { order_id: orderProduct.order_id, product_id: orderProduct.product_id },
            });
          })
        );
      } else {
        throw new Error('Invalid products data in orderData');
      }
  
      setOrders((prevOrders) => [...prevOrders, newOrder]);
  
      return newOrder;
    } catch (err) {
      handleMutationError(err);
      throw err;
    }
  };
  

  const insertOrderProduct = async (orderProductData) => {
    try {
      const response = await addOrderProductMutation({
        variables: { objects: [orderProductData] },
      });
      return response;
    } catch (err) {
      handleMutationError(err);
      throw err;
    }
  };

  const handleMutationError = (err) => {
    if (err.graphQLErrors) {
      err.graphQLErrors.forEach(({ message, locations, path }) => {
        console.error(`GraphQL error: Message: ${message}, Location: ${locations}, Path: ${path}`);
      });
    }
    if (err.networkError) {
      console.error('Network error:', err.networkError);
    }
    console.error('Failed to place order', err);
  };

  // Context value provided to consumers
  const orderContextValue = {
    orders,
    placeOrder,
  };

  return (
    <OrderContext.Provider value={orderContextValue}>
      {children}
    </OrderContext.Provider>
  );
};


const CombinedProviders = ({ children }) => (
  <ApolloProvider client={client}>
    <ProductProvider>
      <UserProvider>
        <OrderProvider>{children}</OrderProvider>
      </UserProvider>
    </ProductProvider>
  </ApolloProvider>
);

export default CombinedProviders;







