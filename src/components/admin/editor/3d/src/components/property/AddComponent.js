import React, { Component } from 'react';
import { Select, Modal, Input } from 'antd';
import { EntityTools } from '../../tools';
import { capitalize } from '../../tools/UtilTools';


class AddComponent extends Component {
    state = {
        componentId: '',
    }

    handleSelect = (value) => {
        const { entity } = this.props;
        if (value === 'event-set') {
            Modal.info({
                title: 'Please input ID for the component',
                content: (
                    <Input onChange={e => { this.setState({ componentId: e.target.value })}} />
                ),
                onOk: () => this.state.componentId.length ? this.handleAddComponent(`${value}__${this.state.componentId}`) : null,
            });
            return;
        }
        if (entity.components) {
            if (entity.components[value]) {
                Modal.info({
                    title: 'Please input ID for the component',
                    content: (
                        <Input onChange={e => { this.setState({ componentId: e.target.value })}} />
                    ),
                    onOk: () => this.state.componentId.length ? this.handleAddComponent(`${value}__${this.state.componentId}`) : null,
                });
                return;
            }
        } else {
            if (entity.hasAttribute(value)) {
                Modal.info({
                    title: 'Please input ID for the component',
                    content: (
                        <Input onChange={e => { this.setState({ componentId: e.target.value })}} />
                    ),
                    onOk: () => this.state.componentId.length ? this.handleAddComponent(`${value}__${this.state.componentId}`) : null,
                });
                return;
            }
        }
        this.handleAddComponent(value);
    }

    handleAddComponent = (componentId) => {
        const { entity } = this.props;
        EntityTools.addComponent(entity, componentId);
    }

    render() {
        const { entity, generalComponents } = this.props;
        return (
            <div style={{ display: 'flex', justifyContent: 'center', margin: 16 }}>
                <Select
                    showSearch={true}
                    dropdownStyle={{ zIndex: 9999 }}
                    placeholder={'Add Component'}
                    onSelect={this.handleSelect}
                    optionFilterProp="children"
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {
                        Object.keys(AFRAME.components)
                        .filter(componentName => {
                            if (AFRAME.components[componentName].multiple) {
                                return true;
                            }
                            if (entity.components) {
                                return !Object.keys(entity.components).concat(generalComponents).some(comp => comp === componentName);
                            } else {
                                if (entity.hasAttribute(componentName)) {
                                    return false;
                                }
                                return true;
                            }
                        })
                        .map((componentName) => {
                            return (
                                <Select.Option key={componentName} value={componentName}>
                                    {capitalize(componentName)}
                                </Select.Option>
                            )
                        })
                    }
                </Select>
            </div>
        );
    }
}

export default AddComponent;
