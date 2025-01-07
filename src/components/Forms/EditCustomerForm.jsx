import { useState } from "react";
import fetchApi from "../../helpers/fetchApi";
import { useAuth } from "../../contexts/AuthContext";

export const EditCustomerForm = ({ onClose, handleGetCustomerData }) => {
    const { accessToken } = useAuth();

    const [customerId, setCustomerId] = useState('');
    const [customerData, setCustomerData] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [updatedCustomerData, setUpdatedCustomerData] = useState()

    const getCustomerDataById = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const { data, error } = await fetchApi(
                `/api/customers/${customerId}`,
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

            setCustomerData(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (key, value) => {
        setUpdatedCustomerData(prevData => ({
            ...prevData,
            [key]: value
        }));
    };

    const submitUpdatedCustomerData = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const { error } = await fetchApi(
                `/api/customers/${customerId}`,
                'PUT',
                { updated_customer_data: updatedCustomerData },
                accessToken,
                true
            );

            if (error) {
                setError(error);
                setLoading(false)
                return;
            }

            handleGetCustomerData();
            onClose();
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <form onSubmit={getCustomerDataById} >
                <input
                    placeholder='ID'
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    disabled={loading}
                    required
                />
                <button type='submit' disabled={loading}>Search</button>
            </form>
            <form onSubmit={submitUpdatedCustomerData} >
                {Object.keys(customerData).map((key) => (
                    <input
                        placeholder={customerData[key]}
                        value={updatedCustomerData?.[key] || customerData[key]}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        disabled={loading}
                        key={key}
                    />
                ))}
                <button type='submit' disabled={loading || !updatedCustomerData}>Save</button>
                <p>{JSON.stringify(error)}</p>
            </form>
        </div>

    )
}