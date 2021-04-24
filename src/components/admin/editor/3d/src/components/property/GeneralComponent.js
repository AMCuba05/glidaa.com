import React, { Component } from 'react';
import { Collapse } from 'antd';
import FormRender from './FormRender';
import Mixins from './Mixins';

class GeneralComponent extends Component {
    render() {
        const { entity, form, type, generalComponents } = this.props;
        return (
            <Collapse bordered={false} defaultActiveKey={['general']}>
                <Collapse.Panel key={'general'} header={'General'}>
                    {
                        generalComponents.map((componentName) => {
                            const { schema } = AFRAME.components[componentName] 
                            let data;
                            if (entity.object3D) {
                                data = entity.object3D[componentName] 
                                if (componentName === 'rotation') {
                                    data = {
                                        x: AFRAME.THREE.Math.radToDeg(entity.object3D.rotation.x),
                                        y: AFRAME.THREE.Math.radToDeg(entity.object3D.rotation.y),
                                        z: AFRAME.THREE.Math.radToDeg(entity.object3D.rotation.z),
                                    };
                                }
                            } else {
                                if (componentName === 'name') {
                                    if (entity.title) {
                                        data = entity.title;
                                    } else if (entity.id) {
                                        data = entity.id;
                                    } else {
                                        data = entity.tagName.toLowerCase();
                                    }
                                } else {
                                    data = entity.getAttribute(componentName);
                                }
                            }
                            return (
                                <FormRender
                                    key={componentName}
                                    entity={entity}
                                    data={data}
                                    componentName={componentName}
                                    schema={schema}
                                    form={form}
                                />
                            )
                        })
                    }
                    {type === 'entity' && <Mixins entity={entity} />}
                </Collapse.Panel>
            </Collapse>
        );
    }
}

export default GeneralComponent;
