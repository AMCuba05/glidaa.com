import React, { Component } from 'react';
import { Icon, Radio } from 'antd';

import { EventTools } from '../../tools';


const transforms = [
    { value: 'translate', icon: 'drag' },
    { value: 'rotate', icon: 'reload' },
    { value: 'scale', icon: 'fullscreen' },
];

class TransformToolbar extends Component {
    state = {
        selectedTransform: 'translate',
    }

    componentDidMount() {
        EventTools.on('transformmodechange', selectedTransform => {
            this.setState({
                selectedTransform,
            });
        });
    }

    handleChangeTransformMode = (selectedTransform) => {
        this.setState({
            selectedTransform,
        });
        EventTools.emit('transformmodechange', selectedTransform);
    }

    render() {
        const { style, className } = this.props;
        const { selectedTransform } = this.state;
        return (
            <div style={style} className={className}>
                <Radio.Group
                    buttonStyle="solid"
                    value={selectedTransform}
                    defaultValue={selectedTransform}
                    onChange={e => this.handleChangeTransformMode(e.target.value)}
                >
                    {
                        transforms.map(transform => (
                            <Radio.Button
                                key={transform.value}
                                value={transform.value}
                            >
                                <Icon type={transform.icon} />
                            </Radio.Button>
                        ))
                    }
                </Radio.Group>
            </div>
        );
    }
}

export default TransformToolbar;
