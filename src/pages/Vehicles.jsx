import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import fetchApi from "../helpers/FetchAPI";

export const Vehicles = () => {
    const { accessToken } = useAuth();
    const [vehicleData, setVehicleData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleGetVehicleData = async () => {
        try {
            const { data, error } = await fetchApi('/api/vehicles', 'GET', undefined, accessToken);
            
            if (error) {
                setError(error);
                return;
            }

            setVehicleData(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetVehicleData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Vehicles</h1>
            <table>
                <thead>
                    <tr>
                        <th>License plate</th>
                        <th>Location</th>
                        <th>Job</th>
                        <th>Cargo</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicleData.map(vehicle => (
                        <tr key={vehicle.license_plate}>
                            <td>{vehicle.license_plate}</td>
                            <td>{`${vehicle.location.lat}, ${vehicle.location.long}`}</td>
                            <td>{vehicle.job.customer.name ? vehicle.job.customer.name : 'AVAILABLE'}</td>
                            <td>
                                <ul>
                                    {vehicle.job.cargo_items.map(cargoItem => (
                                       <li>Item: {cargoItem.name}, Quantity: {cargoItem.quantity}</li> 
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
