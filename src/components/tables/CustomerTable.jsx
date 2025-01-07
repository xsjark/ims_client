import { format } from 'date-fns';

export const CustomerTable = ({ data }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Created</th>
                    <th>Modified</th>
                    <th>Disabled</th>
                </tr>
            </thead>
            <tbody>
                {data.map(customer => (
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>{customer.name}</td>
                        <td>{customer.contact}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phone}</td>
                        <td title={customer.created_by}>
                            {`${format(new Date(customer.created_at), 'dd/MM/yy HH:mm')}`}
                        </td>
                        <td title={customer.modified_at && customer.modified_by}>
                            {customer.modified_at
                                ? format(new Date(customer.disabled_at), 'dd/MM/yy HH:mm')
                                : '-'
                            }
                        </td>
                        <td title={customer.disabled && `${format(new Date(customer.disabled_at), 'dd/MM/yy HH:mm')} by ${customer.disabled_by}`}>
                            {customer.disabled ? 'disabled' : 'active'}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}