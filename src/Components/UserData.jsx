import React, { Component } from 'react'

export default class UserData extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            isLoading: false,
            isError: false,
        }
    }

    // Async Function to get Request

    async componentDidMount() {
        this.setState({ isLoading: true })
        const response = await fetch("https://jsonplaceholder.typicode.com/users")

        if (response.ok) {
            const users = await response.json()
            this.setState({ users, isLoading: false })
        }
        else {
            this.setState({ isError: true, isLoading: false })
        }
    }

    // End Async Function to get Request

    renderTableHeader = () => {
        return Object.keys(this.state.users[0]).map(attr =>
            <th key={attr}> {attr.toUpperCase()} </th>)
    }

    renderTableRows = () => {
        return this.state.users.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{`${user.address.street}, ${user.address.city}`}</td>
                    <td>{user.phone}</td>
                    <td>{user.website}</td>
                    <td>{user.company.name}</td>
                    <td><button>Delete</button></td>
                </tr>
            )
        })
    }



    render() {
        const { users, isLoading, isError , onDelete} = this.state

        if (isLoading) {
            return <div>Loading...</div>
        }

        if (isError) {
            return <div>Error...</div>
        }

        return users.length > 0
            ? (
                <table className='table my-5'>
                    <thead>
                        <tr>
                            {this.renderTableHeader()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTableRows()}
                    </tbody>
                </table>
            ) : (
                <div>
                    No users.
                </div>
            )
    }
}
