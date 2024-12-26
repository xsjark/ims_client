import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import fetchApi from "../helpers/fetchApi";
import ModalWrapper from "../components/ModalWrapper";
import { CreateVehicleForm } from "../components/forms/CreateVehicleForm";
import { DeleteVehicleForm } from "../components/forms/DeleteVehicleForm";
import { EditVehicleForm } from "../components/Forms/EditVehicleForm";
import { VehicleTable } from "../components/tables/VehicleTable";

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
                <CreateVehicleForm handleGetVehicleData={handleGetVehicleData}/>
            </ModalWrapper>
            <ModalWrapper
                isOpen={modalStates.deleteVehicle}
                onClose={() => toggleModal('deleteVehicle')}
            >
                <DeleteVehicleForm handleGetVehicleData={handleGetVehicleData}/>
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
            <VehicleTable data={vehicleData} />
        </div>
    );
};
