import React, { Component } from 'react';
import { Form, Slider, Input } from 'antd';
import ColorPicker from './ColorPicker';

class CreateMarkerForm extends Component {
    render() {
        const { form } = this.props;
        return (
            <Form colon={false}>
                <Form.Item label={'Name'}>
                    {
                        form.getFieldDecorator('name', {
                            initialValue: 'pattern-marker',
                        })(<Input />)
                    }
                </Form.Item>
                <Form.Item label={'Pattern Ratio'}>
                    {
                        form.getFieldDecorator('patternRatio', {
                            initialValue: 0.75,
                        })(<Slider disabled={true} step={0.01} min={0.10} max={0.90} />)
                    }
                </Form.Item>
                <Form.Item label={'Image Size'}>
                    {
                        form.getFieldDecorator('imageSize', {
                            initialValue: 512,
                        })(<Slider disabled={true} min={150} max={2500} />)
                    }
                </Form.Item>
                <Form.Item label={'Border Color'}>
                    {
                        form.getFieldDecorator('borderColor', {
                            initialValue: '#000',
                        })(<ColorPicker disabled={true} />)
                    }
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create({
    onValuesChange: (props, changedValues, allValues) => {
        const { onChange } = props;
        if (onChange) {
            onChange(allValues);
        }
    },
})(CreateMarkerForm);
