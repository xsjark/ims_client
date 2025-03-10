import { useState } from "react";
import fetchApi from "../../helpers/fetchApi";
import { useAuth } from "../../contexts/AuthContext";

export const EditVehicleForm = ({ onClose, handleGetVehicleData }) => {
    const { accessToken } = useAuth();

    const [vehicleId, setVehicleId] = useState('');
    const [vehicleData, setVehicleData] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [updatedVehicleData, setUpdatedVehicleData] = useState()

    const getVehicleDataById = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const { data, error } = await fetchApi(
                `/api/vehicles/${vehicleId}`,
                'GET',
                undefined,
                accessToken,
                true
            );

            if (error) {
                setError(error);
                setLoading(false)
                return;
            }

            setVehicleData(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (key, value) => {
        setUpdatedVehicleData(prevData => ({
            ...prevData,
            [key]: value
        }));
    };

    const submitUpdatedVehicleData = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const { error } = await fetchApi(
                `/api/vehicles/${vehicleId}`,
                'PUT',
                { updated_vehicle_data: updatedVehicleData },
                accessToken,
                true
            );

            if (error) {
                setError(error);
                setLoading(false)
                return;
            }

            handleGetVehicleData();
            onClose();
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <form onSubmit={getVehicleDataById} >
                <input
                    placeholder='ID'
                    value={vehicleId}
                    onChange={(e) => setVehicleId(e.target.value)}
                    disabled={loading}
                    required
                />
                <button type='submit' disabled={loading}>Search</button>
            </form>
            <form onSubmit={submitUpdatedVehicleData} >
                {Object.keys(vehicleData).map((key) => (
                    <input
                        placeholder={vehicleData[key]}
                        value={updatedVehicleData?.[key] || vehicleData[key]}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        disabled={loading}
                        key={key}
                    />
                ))}
                <button type='submit' disabled={loading || !updatedVehicleData}>Save</button>
                <p>{error.toString()}</p>
            </form>
        </div>

    )
}