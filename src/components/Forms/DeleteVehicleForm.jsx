import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext"
import fetchApi from "../../helpers/FetchAPI";

export const DeleteVehicleForm = ({ onClose }) => {
    const { accessToken } = useAuth();
    const [vehicleId, setVehicleId] = useState('');
    const [error, setError] = useState();
    const [deleting, setDeleting] = useState(false)

    const handleSubmit = async () => {
        setDeleting(true)
        try {
            const { error } = await fetchApi('/api/vehicles', 'DELETE', { id: vehicleId }, accessToken)
            
            if (error) {
                setError(error);
            }

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