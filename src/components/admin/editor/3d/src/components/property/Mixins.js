import React, { PureComponent } from 'react';
import { Form, Select } from 'antd';

import { EventTools } from '../../tools';

class Mixins extends PureComponent {
    state = {
        mixins: [],
        selectedItems: [],
    }

    componentDidMount() {
        this.buildMixins(this.props.entity);
        EventTools.on('assetcreate', () => {
            this.buildMixins(this.props.entity);
        });
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.buildMixins(nextProps.entity);
    }

    getMixins = (selectedItems) => {
        return Array.from(document.querySelectorAll('a-mixin'))
        .map(mixin => {
            return {
                key: mixin.id,
                label: mixin.getAttribute('title') || mixin.id,
            };
        })
        .filter(mixin => !selectedItems.some((item) => item.key === mixin.key));
    }

    buildMixins = (entity) => {
        if (entity) {
            const selectedItems = entity.mixinEls.map((mixin) => ({
                key: mixin.id,
                label: mixin.getAttribute('title') || mixin.id,
            }));
            this.setState({
                selectedItems,
                mixins: this.getMixins(selectedItems),
            });
        }
    }

    handleUpdateMixin = (selectedItems) => {
        const { entity } = this.props;
        const value = selectedItems.map(item => item.key).join(' ');
        entity.setAttribute('mixin', value);
        EventTools.emit('entityupdate', {
            component: 'mixin',
            entity,
            property: '',
            value,
        });
        this.setState({
            selectedItems,
            mixins: this.getMixins(selectedItems),
        });
    }

    render() {
        const { mixins, selectedItems } = this.state;
        return (
            <Form.Item label={'Mixins'}>
                <Select
                    placeholder={'Select the mixin'}
                    value={selectedItems}
                    mode="multiple"
                    labelInValue={true}
                    onChange={this.handleUpdateMixin}
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {
                        mixins.map(mixin => {
                            return (
                                <Select.Option key={mixin.key} value={mixin.key}>
                                    {mixin.label}
                                </Select.Option>
                            );
                        })
                    }
                </Select>
            </Form.Item>
        );
    }
}

export default Mixins;
