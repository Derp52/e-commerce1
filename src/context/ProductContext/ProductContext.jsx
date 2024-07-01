import React, { createContext, useState, useEffect } from 'react';
import { ApolloProvider, useMutation, useQuery } from '@apollo/client';
import client from '../client/client';
import { GET_PRODUCTS, ADD_USER, ADD_ORDER } from '../Apollo/queries';

export const ProductContext = createContext();
export const UserContext = createContext();

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
  const [placeOrderMutation] = useMutation(ADD_ORDER); // Replace PLACE_ORDER with your actual mutation

  const placeOrder = async (orderData) => {
    try {
      const { data } = await placeOrderMutation({
        variables: orderData,
      });
      setOrders([...orders, data.placeOrder]); // Update orders state with the new order
    } catch (err) {
      handleMutationError(err);
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

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

const ApolloWrapper = ({ children }) => (
  <ApolloProvider client={client}>
    <UserProvider>
      <ProductProvider>
        <OrderProvider>{children}</OrderProvider>
      </ProductProvider>
    </UserProvider>
  </ApolloProvider>
);

export { ApolloWrapper, ProductProvider, UserProvider };

