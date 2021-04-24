import React, { Component } from 'react';
import { Entity } from 'aframe';
import { Collapse, Icon, Modal } from 'antd';
import { FormComponentProps } from 'antd/lib/form';

import { capitalize } from '../../tools/UtilTools';
import FormRender from './FormRender';
import { EntityTools, EventTools } from '../../tools';
import { AssetSchema, AssetComponents } from '../../constants';

class Components extends Component {
	state = {
		activeKey: undefined,
	};

	componentDidMount() {
		EventTools.on('componentadd', (detail) => {
			this.setState({
				activeKey: detail.component,
			});
		});
	}

	/**
	 * @description Remove component
	 * @param {string} componentName
	 */
	handleRemoveComponent = (componentName) => {
		const { entity } = this.props;
		EntityTools.removeComponent(entity, componentName);
	};

	/**
	 * @description Change the collapse
	 * @param {(string | string[])} key
	 */
	handleChangeCollapse = (activeKey) => {
		this.setState({
			activeKey,
		});
	};

	render() {
		const { entity, form, type, generalComponents } = this.props;
		const { activeKey } = this.state;
		return (
			<Collapse activeKey={activeKey} accordion={true} bordered={false} onChange={this.handleChangeCollapse}>
				{entity.components
					? Object.keys(entity.components)
							.filter(component => !generalComponents.some(comp => comp === component))
							.map(key => {
								const { schema, data } = entity.components[key];
								const isSingleProperty = AFRAME.schema.isSingleProperty(schema);
								return (
									<Collapse.Panel
										key={key}
										header={capitalize(key)}
										extra={
											<Icon
												type="close"
												onClick={(e) => {
													e.stopPropagation();
													Modal.confirm({
														title: 'Remove component',
														content: `Do you really want to remove component ${key}?`,
														onOk: () => this.handleRemoveComponent(key),
													});
												}}
											/>
										}
									>
										{isSingleProperty ? (
											<FormRender
												entity={entity}
												componentName={key}
												data={data}
												schema={schema}
												form={form}
											/>
										) : (
											Object.keys(schema).map(schemaKey => {
												const componentData = data[schemaKey] ;
												const componentShcema = schema[schemaKey] ;
												return (
													<FormRender
														key={schemaKey}
														entity={entity}
														componentName={key}
														data={componentData}
														schemaKey={schemaKey}
														schema={componentShcema}
														form={form}
													/>
												);
											})
										)}
									</Collapse.Panel>
								);
							})
					: type === 'entity'
					? Object.keys(AssetComponents)
							.filter(component => entity.hasAttribute(component))
							.filter(component => !generalComponents.some(comp => comp === component))
							.map(key => {
								const { schema, isSingleProp } = AssetComponents[key ];
								const AframeComponent = AFRAME.components[key] ;
								let data = entity.getAttribute(key);
								if (isSingleProp && AframeComponent && AframeComponent.schema) {
									data = AframeComponent.schema.parse(data);
								}
								return (
									<Collapse.Panel
										key={key}
										header={capitalize(key)}
										extra={
											<Icon
												type="close"
												onClick={(e) => {
													e.stopPropagation();
													Modal.confirm({
														title: 'Remove component',
														content: `Do you really want to remove component ${key}?`,
														onOk: () => this.handleRemoveComponent(key),
													});
												}}
											/>
										}
									>
										{isSingleProp ? (
											<FormRender
												entity={entity}
												componentName={key}
												data={data}
												schema={schema}
												form={form}
											/>
										) : (
											Object.keys(schema).map(schemaKey => {
												const componentData = data[schemaKey];
												const componentShcema = schema[schemaKey];
												return (
													<FormRender
														key={schemaKey}
														entity={entity}
														componentName={key}
														data={componentData}
														schemaKey={schemaKey}
														schema={componentShcema}
														form={form}
													/>
												);
											})
										)}
									</Collapse.Panel>
								);
							})
					: AssetSchema[entity.tagName.toLowerCase()].map((schemaKey) => {
							const { schema } = AssetComponents[schemaKey];
							const data = entity.getAttribute('src');
							return (
								<Collapse.Panel key={'src'} header={capitalize(schemaKey)}>
									<FormRender
										entity={entity}
										componentName={'src'}
										data={data}
										schema={schema}
										form={form}
									/>
								</Collapse.Panel>
							);
					  })}
			</Collapse>
		);
	}
}

export default Components;
