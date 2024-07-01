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
mutation InsertOrder($quantity: Int, $total_price: Float, $image: String, $kurir: String, $product_id: String, $user_id: String) {
  insert_order(objects: {quantity: $quantity, total_price: $total_price, image: $image, kurir: $kurir, product_id: $product_id, user_id: $user_id}) {
    affected_rows
    returning {
      quantity
			total_price
			image
			kurir
			id
			product_id
			user_id
    }
  }
}`;