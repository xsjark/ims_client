import { format } from 'date-fns';

export const VehicleTable = ({ data }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>License Plate</th>
                    <th>Classification</th>
                    <th>Location</th>
                    <th>Job</th>
                    <th>Cargo</th>
                    <th>Created</th>
                    <th>Modified</th>
                    <th>Disabled</th>
                    <th>Disabled At</th>
                </tr>
            </thead>
            <tbody>
                {data.map(vehicle => (
                    <tr key={vehicle.id}>
                        <td>{vehicle.id}</td>
                        <td>{vehicle.license_plate}</td>
                        <td>{vehicle.classification.description}</td>
                        <td>{`${vehicle.longitude}, ${vehicle.latitude}`}</td>
                        <td>{vehicle.job ? vehicle.job.customer.name : 'AVAILABLE'}</td>
                        <td>
                            <ul>
                                {vehicle.job ? vehicle.job.cargo_items.map(cargoItem => (
                                    <li key={cargoItem.id}>
                                        {cargoItem.name}(x{cargoItem.quantity})
                                    </li>
                                )) : '-'
                                }
                            </ul>
                        </td>
                        <td>
                            {`${format(new Date(vehicle.created_at), 'dd/MM/yy HH:mm')}`}
                        </td>
                        <td>
                            {vehicle.modified_at
                                ? format(new Date(vehicle.disabled_at), 'dd/MM/yy HH:mm')
                                : '-'
                            }
                        </td>
                        <td>{vehicle.disabled ? 'disabled' : 'active'}</td>
                        <td>
                            {vehicle.disabled
                                ? format(new Date(vehicle.disabled_at), 'dd/MM/yy HH:mm')
                                : '-'
                            }
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}