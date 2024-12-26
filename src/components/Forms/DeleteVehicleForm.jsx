import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext"
import fetchApi from "../../helpers/fetchApi";

export const DeleteVehicleForm = ({ onClose, handleGetVehicleData }) => {
    const { accessToken } = useAuth();
    const [vehicleId, setVehicleId] = useState('');
    const [error, setError] = useState();
    const [deleting, setDeleting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDeleting(true);
        try {
            const { error } = await fetchApi(
                '/api/vehicles', 
                'DELETE', 
                { id: vehicleId }, 
                accessToken,
                true
            )
            
            if (error) {
                setError(error);
            }

            handleGetVehicleData();
            onClose();
        } catch (error) {
            setError(error)
        } finally {
            setDeleting(false);
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <input 
                placeholder='Vehicle ID'
                value={vehicleId}
                onChange={(e) => setVehicleId(e.target.value)} 
            />
            <button type='submit' disabled={deleting} >Delete</button>
            <p>{error}</p>
        </form>
    )
}