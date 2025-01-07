import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import fetchApi from "../helpers/fetchApi";
import ModalWrapper from "../components/ModalWrapper";
import { CustomerTable } from "../components/tables/CustomerTable";
import { CreateCustomerForm } from "../components/forms/CreateCustomerForm";
import { EditCustomerForm } from "../components/forms/EditCustomerForm";
import { DeleteCustomerForm } from "../components/forms/DeleteVehicleForm copy";

export const Customers = () => {
    const { accessToken } = useAuth();

    const [customerData, setCustomerData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalStates, setModalStates] = useState({
        createCustomer: false,
        deleteCustomer: false,
        editCustomer: false
    });

    const toggleModal = (modalType) => {
        setModalStates(prevStates => ({
            ...prevStates,
            [modalType]: !prevStates[modalType]
        }));
    };

    const handleGetCustomerData = async () => {
        try {
            const { data, error } = await fetchApi('/api/customers', 'GET', undefined, accessToken);

            if (error) {
                setError(error);
                return;
            }

            setCustomerData(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleGetCustomerData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <ModalWrapper
                isOpen={modalStates.createCustomer}
                onClose={() => toggleModal('createCustomer')}
            >
                <CreateCustomerForm handleGetCustomerData={handleGetCustomerData}/>
            </ModalWrapper>
            <ModalWrapper
                isOpen={modalStates.deleteCustomer}
                onClose={() => toggleModal('deleteCustomer')}
            >
                <DeleteCustomerForm handleGetCustomerData={handleGetCustomerData}/>
            </ModalWrapper>
            <ModalWrapper
                isOpen={modalStates.editCustomer}
                onClose={() => toggleModal('editCustomer')}
            >
                <EditCustomerForm handleGetCustomerData={handleGetCustomerData}/>
            </ModalWrapper>
            <h1>Customers</h1>
            <button onClick={() => toggleModal('createCustomer')}>Create</button>            
            <button onClick={() => toggleModal('deleteCustomer')}>Delete</button>
            <button onClick={() => toggleModal('editCustomer')}>Edit</button>
            <CustomerTable data={customerData} />
        </div>
    );
};
