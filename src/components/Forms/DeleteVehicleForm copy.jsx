import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext"
import fetchApi from "../../helpers/fetchApi";

export const DeleteCustomerForm = ({ onClose, handleGetCustomerData }) => {
    const { accessToken } = useAuth();
    const [customerId, setCustomerId] = useState('');
    const [error, setError] = useState();
    const [deleting, setDeleting] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDeleting(true);
        try {
            const { error } = await fetchApi(
                '/api/customers', 
                'DELETE', 
                { id: customerId }, 
                accessToken,
                true
            )
            
            if (error) {
                setError(error);
            }

            handleGetCustomerData();
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
                placeholder='Customer ID'
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)} 
            />
            <button type='submit' disabled={deleting} >Delete</button>
            <p>{error}</p>
        </form>
    )
}