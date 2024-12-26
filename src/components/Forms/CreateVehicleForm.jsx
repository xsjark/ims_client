import { useState } from "react"
import fetchApi from "../../helpers/fetchApi";
import { useAuth } from "../../contexts/AuthContext";

export const CreateVehicleForm = ({ onClose, handleGetVehicleData }) => {

    const { accessToken } = useAuth();

    const [licensePlate, setLicensePlate] = useState('');
    const [classification, setClassification] = useState('');
    const [error, setError] = useState('');
    const [updating, setUpdating] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const result = await fetchApi(
                '/api/vehicles', 
                'POST', 
                { 
                    license_plate: licensePlate,
                    classification: classification
                }, 
                accessToken,
                true
            );
    
            if (result.error) {
                setError(result.error);
                console.log(typeof(error))
                return;
            }
            
            handleGetVehicleData();
            onClose();
        } catch (error) {
            setError(error);
        } finally {
            setUpdating(false);
        }
    }
    

    return (
        <form onSubmit={handleSubmit}>
            <input 
                placeholder='License plate'
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
            />
            <input 
                placeholder='Classification'
                value={classification}
                onChange={(e) => setClassification(e.target.value)}
            />
            <button type='submit' disabled={updating} >Create</button>
            <p>{error.toString()}</p>
        </form>
    )
}