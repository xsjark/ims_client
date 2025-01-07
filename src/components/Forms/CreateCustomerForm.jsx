import { useState } from "react"
import fetchApi from "../../helpers/fetchApi";
import { useAuth } from "../../contexts/AuthContext";

export const CreateCustomerForm = ({ onClose, handleGetCustomerData }) => {

    const { accessToken } = useAuth();

    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [updating, setUpdating] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdating(true);
        try {
            const result = await fetchApi(
                '/api/customers', 
                'POST', 
                { 
                    name,
                    contact,
                    email,
                    phone
                }, 
                accessToken,
                true
            );
    
            if (result.error) {
                setError(result.error);
                console.log(typeof(error))
                return;
            }
            
            handleGetCustomerData();
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
                placeholder='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input 
                placeholder='contact'
                value={contact}
                onChange={(e) => setContact(e.target.value)}
            />
            <input 
                placeholder='phone'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <input 
                placeholder='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type='submit' disabled={updating} >Create</button>
            <p>{JSON.stringify(error)}</p>
        </form>
    )
}