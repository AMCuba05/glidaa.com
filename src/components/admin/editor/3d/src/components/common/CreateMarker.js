import React, { Component } from 'react';
import {  Button, Radio } from 'antd';
import uuid from 'uuid';

import CreateMarkerForm from './CreateMarkerForm';
import ARPatternFile from '../../lib/ARPatternFile';

class CreateMarker extends Component {
    formRef;

    state = {
        imageURL: '',
        innerImageURL: '',
        markerType: 'image',
    }


    /**
     * @description Clear form
     */
    handleClear = () => {
        const { form } = this.formRef.props;
        form.resetFields();
        this.setState({
            imageURL: '',
            innerImageURL: '',
        });
    }

    /**
     * @description Choose image
     */
    /**
     * @description Change input URL
     * @param {*} imageURL
     */
    

    /**
     * @description Save marker
     */
    handleSave = () => {
        const { form } = this.formRef.props;
        const { onSave } = this.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            const { innerImageURL, imageURL } = this.state;
            if (!innerImageURL.length) {
                return;
            }
            if (onSave) {
                ARPatternFile.encodeImageURL(innerImageURL, patternFileString => {
                    onSave({
                        ...values,
                        id: uuid(),
                        name: `${values.name}.patt`,
                        title: values.name,
                        thumbnail: imageURL,
                        pattern: new Blob([patternFileString], { type: 'text/plain' }),
                    });
                });
            }
        });
    }

    /**
     * @description Change form
     * @param {*} values
     */
    handleChangeForm = (values) => {
        const { innerImageURL } = this.state;
        const { patternRatio, imageSize, borderColor } = values;
        ARPatternFile.buildFullMarker(innerImageURL, patternRatio, imageSize, borderColor, (imageURL) => {
            this.setState({
                imageURL,
            });
        });
    }

    render() {
        const { onCancel, visible } = this.props;
        const { imageURL, markerType } = this.state;
        return (
            <div style={{ overflowX: 'hidden', width: visible ? 360 : 0, transition: 'width 0.3s', borderLeft: visible ? '1px solid rgba(0, 0, 0, 0.1)' : 0 }}>
                <div className="editor-picker">
                    <div className="editor-picker-form">
                        <Radio.Group onChange={e => { this.setState({ markerType: e.target.value }); }} value={markerType} style={{ marginBottom: 8 }}>
                            <Radio.Button style={{ width: '50%', textAlign: 'center' }} value="image">{'Image'}</Radio.Button>
                            <Radio.Button style={{ width: '50%', textAlign: 'center' }} value="qrcode">{'QR Code'}</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className="editor-picker-preview">
                        <div className="editor-picker-container">
                            <img src={imageURL} alt="" />
                        </div>
                    </div>
                    <div className="editor-picker-actions">
                        <CreateMarkerForm wrappedComponentRef={(form) => this.formRef = form} onChange={this.handleChangeForm} />
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button style={{ marginRight: 8 }} onClick={this.handleClear}>{'Clear'}</Button>
                            <Button style={{ marginRight: 8 }} onClick={onCancel}>{'Cancel'}</Button>
                            <Button style={{ marginLeft: 8 }} type="primary" onClick={this.handleSave}>{'Save'}</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateMarker;
