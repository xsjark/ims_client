import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import fetchApi from "../helpers/FetchAPI";
import ModalWrapper from "../components/ModalWrapper";
import { CreateVehicleForm } from "../components/Forms/CreateVehicleForm";
import { DeleteVehicleForm } from "../components/Forms/DeleteVehicleForm";
import { EditVehicleForm } from "../components/Forms/EditVehicleForm";

export const Vehicles = () => {
    const { accessToken } = useAuth();

    const [vehicleData, setVehicleData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalStates, setModalStates] = useState({
        createVehicle: false,
        deleteVehicle: false,
        editVehicle: false
    });

    const toggleModal = (modalType) => {
        setModalStates(prevStates => ({
            ...prevStates,
            [modalType]: !prevStates[modalType]
        }));
    };

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
            <ModalWrapper
                isOpen={modalStates.createVehicle}
                onClose={() => toggleModal('createVehicle')}
            >
                <CreateVehicleForm />
            </ModalWrapper>
            <ModalWrapper
                isOpen={modalStates.deleteVehicle}
                onClose={() => toggleModal('deleteVehicle')}
            >
                <DeleteVehicleForm />
            </ModalWrapper>
            <ModalWrapper
                isOpen={modalStates.editVehicle}
                onClose={() => toggleModal('editVehicle')}
            >
                <EditVehicleForm handleGetVehicleData={handleGetVehicleData}/>
            </ModalWrapper>
            <h1>Vehicles</h1>
            <button onClick={() => toggleModal('createVehicle')}>Create</button>            
            <button onClick={() => toggleModal('deleteVehicle')}>Delete</button>
            <button onClick={() => toggleModal('editVehicle')}>Edit</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>License plate</th>
                        <th>Location</th>
                        <th>Job</th>
                        <th>Cargo</th>
                        <th>Disabled</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicleData.map(vehicle => (
                        <tr key={vehicle.id}>
                            <td>{vehicle.id}</td>
                            <td>{vehicle.license_plate}</td>
                            <td>{`${vehicle.location.lat}, ${vehicle.location.long}`}</td>
                            <td>{vehicle.job?.customer.name ? vehicle.job.customer.name : 'AVAILABLE'}</td>
                            <td>
                                <ul>
                                    {vehicle.job && vehicle.job.cargo_items.map(cargoItem => (
                                        <li>Item: {cargoItem.name}, Quantity: {cargoItem.quantity}</li>
                                    ))}
                                </ul>
                            </td>
                            <td>{JSON.stringify(vehicle.disabled)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
