import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
query GetProduct {
    product {
      stock
          price
          category
          desc
          image
          name
          size
          id
    }
  }
`;

export const ADD_USER = gql`
mutation InsertUser( $address: String, $email: String, $password: String, $phone: String, $username: String) {
  insert_user(objects: {address: $address, email: $email, password: $password, phone: $phone, username: $username}) {
    affected_rows
    returning {
      address
			email
			password
			phone
			username
      id
    }
  }
}
`;

export const ADD_ORDER = gql`
mutation InsertOrder($quantity: Int, $total_price: numeric, $image: String, $kurir: String, $Date: timestamptz, $id_user: uuid) {
  insert_order(objects: {quantity: $quantity, total_price: $total_price, image: $image, kurir: $kurir, Date: $Date, id_user: $id_user}) {
    affected_rows
    returning {
      quantity
			total_price
			image
			kurir
			Date
			id_user
			order_id
    }
  }
}`;

export const ADD_ORDER_PRODUCT = gql`
mutation InsertOrderProduct($order_id: uuid, $product_id: uuid) {
  insert_order_product(objects: {order_id: $order_id, product_id: $product_id}) {
    affected_rows
    returning {
      id
			order_id
			product_id
    }
  }
}`;