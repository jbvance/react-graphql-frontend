import Link from 'next/link';
import { Mutation } from 'react-apollo';
import NavStyles from './styles/NavStyles';
import Signout from './Signout';
import User from './User';
import CartCount from './CartCount';
import { TOGGLE_CART_MUTATION } from './Cart';

const getCartCount = cart => {
  return cart.reduce((tally, cartItem) => {
    return tally + cartItem.quantity;
  }, 0);
}

const Nav = () => (
    <User>
      {({ data: { me }}) => (
        <NavStyles>
           <Link href="/items">
             <a>Shop</a>
          </Link>
          { me && (
            <>
            <Link href="/sell">
              <a>Sell</a>
            </Link>
            <Link href="/orders">
              <a>Orders</a>
            </Link>
             <Link href="/me">
              <a>Account</a>
            </Link>
            <Signout />
            <Mutation mutation={TOGGLE_CART_MUTATION}>
              {(toggleCart) => (
                <button onClick={toggleCart}>
                  My Cart
                  <CartCount count={getCartCount(me.cart)}/>
                </button>
              )}
            </Mutation>
            </>
          ) }
          { !me && (
             <Link href="/signup">
              <a>Sign In</a>
            </Link>            
          )}                         
        </NavStyles>
      )}
    </User>   
);

export default Nav;
