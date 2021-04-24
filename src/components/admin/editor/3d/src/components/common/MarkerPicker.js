import React, { Component } from 'react';
import { Modal, Icon } from 'antd';
import debounce from 'lodash/debounce';
import AutoComplete from './AutoComplete';
import Markers, { IMarker } from './Markers';
import { AssetTools, EventTools } from '../../tools';

class MarkerPicker extends Component {
	state = {
		value: this.props.data,
		visible: false,
		assets: [],
	};

	componentDidMount() {
		this.setAssets();
		EventTools.on('assetcreate', () => {
			this.setAssets();
		});
		EventTools.on('assetremove', () => {
			this.setAssets();
		});
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.entity.id !== this.props.entity.id) {
			this.setState({
				value: nextProps.data,
			});
		}
	}

	/**
	 * @description Set the assets for autocomplete
	 */
	 setAssets = () => {
		const { schemaKey, componentName } = this.props;
		this.setState({
			assets: AssetTools.buildAssets(AFRAME.INSPECTOR.sceneEl, ['a-mixin', 'img', 'video', 'audio'])
				.filter(asset => {
					if (asset.type === 'a-asset-item' && schemaKey === 'patternUrl') {
						return true;
					}
					return false;
				})
				.map(asset => {
					return {
						value: asset.key.toString(),
						text: asset.title.toString(),
					};
				}),
		});
	};

	/**
	 * @description Click to marker
	 * @param {IMarker} marker
	 */
	 handleClickMarker = (marker) => {
		const { onChange } = this.props;
		if (onChange) {
			const value = window.URL.createObjectURL(marker.pattern);
			this.setState({
				value,
				visible: false,
			});
			onChange(value);
		}
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
	 * @description Debounce value
	 * @param {*} value
	 */
	 debouncedChangeSrc = debounce((value) => {
		const { onChange } = this.props;
		if (onChange) {
			onChange(value);
		}
	}, 200);

	/**
	 * @description  Select the asset in registration assets
	 * @param {*} value
	 */
	 handleSelectSrc = (value) => {
		const assetItem = document.getElementById(value);
		if (assetItem) {
			const src = assetItem.getAttribute('src');
			this.setState({
				value: src,
			});
			this.debouncedChangeSrc(src);
		}
	};

	/**
	 * @description Change to src
	 * @param {React.ChangeEvent<HTMLInputElement>} e
	 */
	 handleChangeSrc = (value) => {
		this.debouncedChangeSrc(value);
		this.setState({
			value,
		});
	};

	render() {
		const { entity, schemaKey, componentName } = this.props;
		const { visible, value, assets } = this.state;
		return (
			<>
				<AutoComplete
					onChange={this.handleChangeSrc}
					onSelect={this.handleSelectSrc}
					value={value.length > 100 ? value.substring(0, 100).concat('...') : value}
					dataSource={(entity.object3D || entity.tagName.toLowerCase() === 'a-asset-item') && assets}
					filterOption={(inputValue, option) =>
						option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
					}
					addonAfter={<Icon type="shop" onClick={this.handleModalVisible} />}
				/>
				<Modal
					className="editor-item-modal"
					visible={visible}
					onCancel={this.handleModalVisible}
					footer={null}
					title={'Markers'}
					width="75%"
					style={{ height: '75%' }}
				>
					<Markers onClick={this.handleClickMarker} />
				</Modal>
			</>
		);
	}
}

export default MarkerPicker;
