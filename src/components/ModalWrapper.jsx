import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

const ModalWrapper = ({ isOpen, onClose, children }) => {

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const modalOverlay = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
    
    const modalContent = {
        background: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        maxWidth: '500px',
        width: '100%'
    }

    return ReactDOM.createPortal(
        <div 
            role="dialog" 
            aria-modal="true" 
            aria-labelledby="modal-title"
            style={modalOverlay}
        >
            <div style={modalContent}>
                <button onClick={onClose}>Close</button>
                {React.cloneElement(children, { onClose })}            
            </div>
        </div>,
        document.body
    );
};

export default ModalWrapper;
