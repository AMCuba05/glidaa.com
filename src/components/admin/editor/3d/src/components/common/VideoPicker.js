import React, { Component } from 'react';

import TexturePicker from './TexturePicker';


class VideoPicker extends Component {
    render() {
        const { schema, data, form, entity, schemaKey, componentName, onChange } = this.props;
        return (
            <div className="editor-picker">
                <div className="editor-picker-form">
                    <TexturePicker
                        schema={schema}
                        data={data}
                        form={form}
                        entity={entity}
                        schemaKey={schemaKey}
                        componentName={componentName}
                        onChange={onChange}
                        prefixUrl={false}
                        baseUrl={false}
                    />
                </div>
                <div className="editor-picker-preview">
                    <div className="editor-picker-container">
                        <video src={data} controls={true} />
                    </div>
                </div>
            </div>
        );
    }
}

export default VideoPicker;
