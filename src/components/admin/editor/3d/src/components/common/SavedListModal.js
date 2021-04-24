import React from 'react';
import { Modal } from 'antd';
import SavedList from './SavedList';


const SavedListModal = props => {
    const { onClickScene, visible, ...other } = props;
    return (
        <Modal visible={visible} {...other}>
            <SavedList visible={visible} onClick={onClickScene} />
        </Modal>
    );
};

export default SavedListModal;
