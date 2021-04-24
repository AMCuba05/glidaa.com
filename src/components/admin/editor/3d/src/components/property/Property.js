import React, { Component } from 'react';
import { Form } from 'antd';
import debounce from 'lodash/debounce';

import GeneralComponent from './GeneralComponent';
import AddComponent from './AddComponent';
import Components from './Components';
import { EntityTools } from '../../tools';
import { Empty } from '../common';
import { GeneralComponents } from '../../models/component';

class Property extends Component {
	UNSAFE_componentWillReceiveProps(nextProps) {
		const { entity: nextEntity, form } = nextProps;
		const { entity: currentEntity } = this.props;
		if (nextEntity && currentEntity && nextEntity.id !== currentEntity.id) {
			form.resetFields();
		}
	}

	getGeneralComponents = (type) =>
		type === 'entity' ? GeneralComponents : ['name'];

	renderGeneralComponent = (
		entity,
		form,
		type,
		generalComponents,
	) => {
		return <GeneralComponent entity={entity} form={form} type={type} generalComponents={generalComponents} />;
	};

	renderAddComponent = (entity, type, generalComponents) => {
		if (type === 'entity' || entity.tagName.toLowerCase() === 'a-mixin') {
			return <AddComponent entity={entity} generalComponents={generalComponents} />;
		}
		return null;
	};

	renderComponents = (entity, form, generalComponents) => {
		let type = 'entity';
		switch (entity.tagName.toLowerCase()) {
			case 'img':
				type = 'asset';
				break;
			case 'a-asset-item':
				type = 'asset';
				break;
			case 'video':
				type = 'asset';
				break;
			case 'audio':
				type = 'asset';
				break;
			default:
				type = 'entity';
				break;
		}
		return <Components entity={entity} form={form} type={type} generalComponents={generalComponents} />;
	};

	render() {
		const { entity, form, type = 'entity' } = this.props;
		const generalComponents = this.getGeneralComponents(type);
		return entity ? (
			<Form style={{ display: 'flex', flexDirection: 'column' }} colon={false}>
				{this.renderGeneralComponent(entity, form, type, generalComponents)}
				{this.renderAddComponent(entity, type, generalComponents)}
				{this.renderComponents(entity, form, generalComponents)}
			</Form>
		) : (
			<Empty />
		);
	}
}

const updateEntity = debounce(
	(entity, propertyName, value) => EntityTools.updateEntity(entity, propertyName, value),
	200,
);

export default Form.create({
	onValuesChange: (props, changedValues, allValues) => {
		const { entity } = props;
		if (entity) {
			const changedComponentName = Object.keys(changedValues)[0];
			if (!entity.object3D && changedComponentName === 'src') {
				updateEntity(entity, changedComponentName, changedValues[changedComponentName]);
				return;
			}
			let schema;
			let isSingleProp;
			if (changedComponentName.includes('animation') || changedComponentName.includes('event-set')) {
				const componentName = changedComponentName.split('__')[0];
				schema = AFRAME.components[componentName].schema;
				isSingleProp = AFRAME.components[componentName].isSingleProp;
			} else {
				schema = AFRAME.components[changedComponentName] 
				isSingleProp = AFRAME.components[changedComponentName] 
			}
			if (!isSingleProp) {
				const changedSchemaKey = Object.keys(changedValues[changedComponentName])[0];
				if (schema[changedSchemaKey]) {
					const newSchema = schema[changedSchemaKey];
					const changedSchema = allValues[changedComponentName];
					const value = newSchema.stringify(changedSchema[changedSchemaKey]);
					const propertyName = `${changedComponentName}.${changedSchemaKey}`;
					updateEntity(entity, propertyName, value);
				} else {
					const changedSchema = allValues[changedComponentName];
					const value = changedSchema[changedSchemaKey];
					const propertyName = `${changedComponentName}.${changedSchemaKey}`;
					updateEntity(entity, propertyName, value);
				}
				return;
			}
			console.log(allValues[changedComponentName]);
			// const value = schema.stringify(allValues[changedComponentName]);
			// console.log(value);
			// updateEntity(entity, changedComponentName, value);
			updateEntity(entity, changedComponentName, allValues[changedComponentName]);
		}
	},
})(Property);
