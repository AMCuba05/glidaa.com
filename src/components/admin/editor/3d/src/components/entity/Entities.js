import React, { Component } from 'react';
import { Tree, List, Modal, Tabs, Radio, Input, message, Row, Col, Card, Avatar } from 'antd';
import Icon from 'polestar-icons';
import difference from 'lodash/difference';
import { AntTreeNodeDropEvent } from 'antd/lib/tree/Tree';

import { SidebarContainer, Scrollbar, Empty } from '../common';
import { catalogs, primitives, getIcon } from '../../constants';
import { EntityTools, EventTools } from '../../tools';
import { IEntity } from '../../models/entity';
import { IPrimitive } from '../../models/primitive';

class Entities extends Component {
	state = {
		visible: false,
		treeNodes: [],
		selectedKeys: ['scene'],
		expandedKeys: ['scene'],
		searchPrimitives: '',
		searchCatalogs: '',
		viewPrimitives: 'card',
		viewCatalogs: 'card',
		spinning: true,
	};

	componentDidMount() {
		EventTools.on('sceneloaded', (scene) => {
			const treeNodes = EntityTools.buildEntities(scene);
			this.setState({
				treeNodes,
				spinning: false,
			});
		});
		EventTools.on('entitycreate', (entity) => {
			const treeNodes = EntityTools.buildEntities(AFRAME.INSPECTOR.sceneEl);
			const diffKeys = difference([entity.parentElement.id], this.state.expandedKeys);
			this.setState({
				treeNodes,
				expandedKeys: Array.from(this.state.expandedKeys.concat(diffKeys)),
			});
		});
		EventTools.on('entityclone', () => {
			const treeNodes = EntityTools.buildEntities(AFRAME.INSPECTOR.sceneEl);
			this.setState({
				treeNodes,
			});
		});
		EventTools.on('entityselect', (entity) => {
			if (entity) {
				this.setState({
					selectedKeys: [entity.id],
				});
			} else {
				this.setState({
					selectedKeys: [],
				});
			}
		});
		EventTools.on('objectselect', (object3D) => {
			if (!object3D) {
				this.setState({
					selectedKeys: [],
				});
			}
		});
		EventTools.on('objectremove', () => {
			const treeNodes = EntityTools.buildEntities(AFRAME.INSPECTOR.sceneEl);
			this.setState({
				treeNodes,
			});
		});
		EventTools.on('entityupdate', (detail) => {
			if (detail.entity.object3D && detail.component === 'name') {
				const treeNodes = EntityTools.buildEntities(AFRAME.INSPECTOR.sceneEl);
				this.setState({
					treeNodes,
				});
			}
		});
	}

	/**
	 * @description Traverse to find the node
	 * @param {string} key
	 * @param {IEntity[]} [treeNodes]
	 * @returns {IEntity}
	 */
	findTreeNode = (key, treeNodes) => {
		let findNode;
		for (let i = 0; i < treeNodes.length; i++) {
			const node = treeNodes[i];
			if (node.key === key) {
				findNode = node;
				return findNode;
			}
			if (node.children.length) {
				findNode = this.findTreeNode(key, node.children);
				if (findNode) {
					return findNode;
				}
			}
		}
		return findNode;
	};

	/**
	 * @description Delete the entity
	 * @returns
	 */
	handleDeleteEntity = () => {
		if (AFRAME.INSPECTOR.selectedEntity) {
			if (AFRAME.INSPECTOR.selectedEntity.tagName.toLowerCase() === 'a-scene') {
				message.warn('Does not delete Scene.');
				return;
			}
			Modal.confirm({
				title: 'Delete entity',
				content: 'Are you sure want to delete this entity?',
				onOk: () => {
					EntityTools.removeSelectedEntity();
				},
			});
		}
	};

	/**
	 * @description Add the Entity
	 * @param {IPrimitive} item
	 */
	handleAddEntity = (item) => {
		this.handleModalVisible();
		EntityTools.createEntity(item);
	};

	/**
	 * @description Change to visible in Modal
	 */
	handleModalVisible = () => {
		this.setState((prevState) => {
			return {
				visible: !prevState.visible,
			};
		});
	};

	/**
	 * @description Select the entity
	 * @param {string[]} selectedKeys
	 */
	handleSelectEntity = (selectedKeys, e) => {
		this.setState(
			{
				selectedKeys,
			},
			() => {
				if (selectedKeys.length) {
					EntityTools.selectEntity(e.node.props.dataRef.entity);
				} else {
					EntityTools.selectEntity();
				}
			},
		);
	};

	/**
	 * @description Expand tree node for the entity
	 * @param {string[]} expandedKeys
	 */
	 handleExpandEntity = (expandedKeys) => {
		this.setState({
			expandedKeys,
		});
	};

	/**
	 * @description Search in Primitives
	 * @param {string} searchPrimitives
	 */
	 handleSearchPrimitives = (searchPrimitives) => {
		this.setState({
			searchPrimitives,
		});
	};

	/**
	 * @description Search in Catalogs
	 * @param {string} searchCatalogs
	 */
	 handleSearchCatalogs = (searchCatalogs) => {
		this.setState({
			searchCatalogs,
		});
	};

	/**
	 * @description Change to view type in Primitives
	 * @param {ViewTypes} viewPrimitives
	 */
	 handleViewPrimitives = (viewPrimitives) => {
		this.setState({
			viewPrimitives,
		});
	};

	/**
	 * @description Change to view type in Catalogs
	 * @param {ViewTypes} viewCatalogs
	 */
	 handleViewCatalogs = (viewCatalogss) => {
		this.setState({
			viewCatalogs,
		});
	};

	/**
	 * @description Drop the entity
	 * @param {AntTreeNodeDropEvent} options
	 * @returns
	 */
	 handleDropEntity = (options) => {
		const { dragNode, node } = options;
		const source = dragNode.props.dataRef.entity 
		const dest = node.props.dataRef.entity 
		if (dest.id === 'scene') {
			message.warn('Can not insert before scene.');
			return;
		}
		const sourceStr = EntityTools.getEntityClipboardRepresentation(source);
		EntityTools.removeEntity(source);
		const dropPos = node.props.pos.split('-');
		const dropPosition = options.dropPosition - Number(dropPos[dropPos.length - 1]);
		if (dropPosition > -1) {
			dest.appendChild(document.createRange().createContextualFragment(sourceStr));
			const treeNodes = EntityTools.buildEntities(AFRAME.INSPECTOR.sceneEl);
			this.setState({
				treeNodes,
			});
		} else {
			const parent = dest.parentElement;
			const createdSource = document.createRange().createContextualFragment(sourceStr);
			parent.insertBefore(createdSource, dest);
			const treeNodes = EntityTools.buildEntities(AFRAME.INSPECTOR.sceneEl);
			this.setState({
				treeNodes,
			});
		}
	};

	/**
	 * @description Render the tree node
	 * @param {IEntity[]} treeNodes
	 */
	renderTreeNodes = (treeNodes) =>
		treeNodes.map(item => {
			if (item.children && item.children.length) {
				return (
					<Tree.TreeNode
						key={item.key.toString()}
						title={item.title}
						icon={<Icon name={item.icon} />}
						dataRef={item}
					>
						{this.renderTreeNodes(item.children)}
					</Tree.TreeNode>
				);
			}
			return (
				<Tree.TreeNode
					key={item.key.toString()}
					title={item.title}
					icon={<Icon name={item.icon} />}
					dataRef={item}
				/>
			);
		});

	/**
	 * @description Render the items with Card
	 * @param {IPrimitive[]} items
	 * @param {string} searchText
	 * @returns
	 */
	renderCardItems = (items, searchTextg) => {
		return (
			<Scrollbar>
				{items.length ? (
					<Row gutter={16} style={{ margin: 0 }}>
						{items
							.filter(
								item =>
									item.title.toLowerCase().includes(searchText.toLowerCase()) ||
									item.description.toLowerCase().includes(searchText.toLowerCase()),
							)
							.map(item => {
								return (
									<Col
										key={item.key}
										md={24}
										lg={12}
										xl={6}
										onClick={() => this.handleAddEntity(item)}
									>
										<Card
											hoverable={true}
											title={item.title}
											extra={
												item.url && (
													<a
														className="editor-item-help-icon"
														onClick={e => e.stopPropagation()}
														target="_blank"
														href={item.url}
													>
														<Icon name="question-circle-o" />
													</a>
												)
											}
											cover={item.image && <img src={item.image} />}
											style={{ marginBottom: 16 }}
											bodyStyle={{ padding: 12, height: 120 }}
										>
											<div className="editor-item-card-desc">{item.description}</div>
										</Card>
									</Col>
								);
							})}
					</Row>
				) : (
					<Empty />
				)}
			</Scrollbar>
		);
	};

	/**
	 * Render the items with List
	 *
	 * @param {IPrimitive[]} items
	 * @param {string} searchText
	 * @returns
	 */
	 renderListItems = (items, searchText) => {
		return (
			<Scrollbar>
				{items.length ? (
					<List
						style={{ padding: '0 8px' }}
						dataSource={items.filter(
							item =>
								item.title.includes(searchText.toLowerCase()) ||
								item.description.includes(searchText.toLowerCase()),
						)}
						renderItem={item => (
							<List.Item>
								<List.Item.Meta
									avatar={
										<Avatar>
											<Icon name={getIcon(item.type)} />
										</Avatar>
									}
									title={
										<div style={{ display: 'flex' }}>
											<a
												style={{ flex: 1 }}
												onClick={() => {
													this.handleAddEntity(item);
												}}
											>
												{item.title}
											</a>
											{item.url && (
												<div style={{ alignSelf: 'flex-end' }}>
													<a
														className="editor-item-help-icon"
														target="_blank"
														href={item.url}
													>
														<Icon name="question-circle-o" />
													</a>
												</div>
											)}
										</div>
									}
									description={item.description}
								/>
							</List.Item>
						)}
					/>
				) : (
					<Empty />
				)}
			</Scrollbar>
		);
	};

	/**
	 * Render the search form
	 *
	 * @param {(value: string) => void} callback
	 * @returns
	 */
	 renderSearch = (callback => {
		return (
			<div style={{ flex: 1, paddingRight: 16 }}>
				<Input allowClear={true} placeholder="Search for Entity..." onChange={e => callback(e.target.value)} />
			</div>
		);
	})

	/**
	 * @description Render the view type form
	 * @param {ViewTypes} viewType
	 * @param {(value: ViewTypes) => void} callback
	 * @returns
	 */
	 renderViewType = (viewType, callback => {
		return (
			<Radio.Group
				buttonStyle="solid"
				value={viewType}
				defaultValue={viewType}
				onChange={e => callback(e.target.value)}
			>
				<Radio.Button value="card">
					<Icon name="table" />
				</Radio.Button>
				<Radio.Button value="list">
					<Icon name="list" />
				</Radio.Button>
			</Radio.Group>
		);
	})

	render() {
		const {
			visible,
			treeNodes,
			selectedKeys,
			expandedKeys,
			viewPrimitives,
			viewCatalogs,
			searchPrimitives,
			searchCatalogs,
			spinning,
		} = this.state;
		return (
			<SidebarContainer
				titleStyle={{ border: 0 }}
				title={
					<>
						<div style={{ flex: 1 }}>{'Entity'}</div>
						<div>
							<Icon
								className="editor-icon"
								style={{ fontSize: '1.25rem', marginRight: 8 }}
								name="plus"
								onClick={this.handleModalVisible}
							/>
							<Icon
								className="editor-icon"
								style={{ fontSize: '1.25rem' }}
								name="trash"
								onClick={this.handleDeleteEntity}
							/>
						</div>
					</>
				}
				spinning={spinning}
			>
				{treeNodes.length ? (
					<Tree
						showIcon={true}
						defaultExpandParent={true}
						selectedKeys={selectedKeys}
						expandedKeys={expandedKeys}
						onExpand={this.handleExpandEntity}
						onSelect={this.handleSelectEntity}
						defaultExpandedKeys={['scene']}
						defaultSelectedKeys={['scene']}
						draggable={true}
						onDrop={this.handleDropEntity}
					>
						{this.renderTreeNodes(treeNodes)}
					</Tree>
				) : (
					<Empty />
				)}
				<Modal
					className="editor-item-modal"
					title={'Add Entity'}
					visible={visible}
					onCancel={this.handleModalVisible}
					footer={null}
					width="75%"
					style={{ height: '75%' }}
				>
					<Tabs tabPosition="left">
						<Tabs.TabPane key="primitives" tab="Primitives">
							<div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
								<div style={{ display: 'flex', padding: '0 8px 16px 8px' }}>
									{this.renderSearch(this.handleSearchPrimitives)}
									{this.renderViewType(viewPrimitives, this.handleViewPrimitives)}
								</div>
								<div style={{ flex: 1 }}>
									{viewPrimitives === 'card'
										? this.renderCardItems(primitives, searchPrimitives)
										: this.renderListItems(primitives, searchPrimitives)}
								</div>
							</div>
						</Tabs.TabPane>
						<Tabs.TabPane key="catalogs" tab="Catalogs">
							<div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
								<div style={{ display: 'flex', padding: '0 8px 16px 8px' }}>
									{this.renderSearch(this.handleSearchCatalogs)}
									{this.renderViewType(viewCatalogs, this.handleViewCatalogs)}
								</div>
								<div style={{ flex: 1 }}>
									{viewCatalogs === 'card'
										? this.renderCardItems(catalogs, searchCatalogs)
										: this.renderListItems(catalogs, searchCatalogs)}
								</div>
							</div>
						</Tabs.TabPane>
					</Tabs>
				</Modal>
			</SidebarContainer>
		);
	}
}

export default Entities;
