import { useState } from "react"
import fetchApi from "../helpers/FetchAPI";
import { AuthProvider, useAuth } from "../contexts/AuthContext";

export const CreateVehicleForm = ({ onClose }) => {

    const { accessToken } = useAuth();

    const [licensePlate, setLicensePlate] = useState('');
    const [error, setError] = useState();
    const [updating, setUpdating] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const { error } = await fetchApi('/api/vehicles', 'POST', { license_plate: licensePlate }, accessToken)

            if (error) {
                setError(error);
            }
            
        } catch (error) {
            setError(error);
        } finally {
            setUpdating(false);
            onClose();
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                placeholder='License plate'
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
            />
            <button type='submit' disabled={updating} >Create</button>
            {error && error}
        </form>
    )
}