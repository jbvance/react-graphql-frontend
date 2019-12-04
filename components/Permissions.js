import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Table from './styles/Table';
import SickButton from './styles/SickButton';
import PropTypes from 'prop-types';


const ALL_USERS_QUERY = gql`
    query {
        users {
            id
            name
            email
            permissions
        }
    }
`;

const possiblePermissions = [
    'ADMIN',
    'USER',
    'ITEMCREATE',
    'ITEMUPDATE',
    'ITEMDELETE',
    'PERMISSIONUPDATE'
];

const Center = styled.div`
  text-align: center;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

class Items extends Component {
  render() {
    return (           
        <Query
          query={ALL_USERS_QUERY}                    
        >
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            console.log("DATA", data);
            return (
               <div>
                  <h2>Manage Permissions</h2>
                  <Table>
                      <thead>
                          <tr>
                              <th>Name</th>
                              <th>Email</th>
                              {possiblePermissions.map(permission => <th key={permission}>{permission}</th>)} 
                              <th>&nbsp;</th>                        
                          </tr>
                      </thead>
                      <tbody>
                        {data.users.map(user => <UserPermissions key={user.id} user={user} />)}
                      </tbody>
                  </Table>                
              </div>
            )
          }}
        </Query>            
    );
  }
}

class UserPermissions extends React.Component {
    static propTypes = {
        user: PropTypes.shape({
            name: PropTypes.string,
            email: PropTypes.string,
            id: PropTypes.string,
            permissions: PropTypes.array
        }).isRequired
    };

    state = {
        permissions: this.props.user.permissions
    };

    handlePermissionChange = (e) => {
        const checkbox = e.target;        
        let updatedPermissions = [...this.state.permissions];
        if(checkbox.checked) {
            updatedPermissions.push(checkbox.value);
        } else {
            updatedPermissions = updatedPermissions.filter(permission => permission !== checkbox.value);
        }
        this.setState({ permissions: updatedPermissions });
        console.log(updatedPermissions);
    }

    render() {
        const user = this.props.user;
        return (
            <tr>
                <td>{user.name}></td>
                <td>{user.email}</td>
                {possiblePermissions.map(permission => (
                   <td key={permission}>
                       <label htmlFor={`${user.id}-permission-${permission}`}>
                           <input type="checkbox" checked={this.state.permissions.includes(permission)} 
                           value={permission}
                           onChange={this.handlePermissionChange}
                        />
                       </label>
                   </td> 
                ))}
                <td>
                    <SickButton>Update</SickButton>
                </td>
            </tr>
        )
    }
}

export default Items;
export { ALL_USERS_QUERY};
