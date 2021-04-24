import debounce from 'lodash/debounce';
import { EventTools, } from '.';


class RaycasterTools {
	constructor(inspector) {
		this.inspector = inspector;
		this.onDownPosition = new AFRAME.THREE.Vector2();
		this.onUpPosition = new AFRAME.THREE.Vector2();
		this.onDoubleClickPosition = new AFRAME.THREE.Vector2();
	}

	init = (inspector) => {
		// Use cursor="rayOrigin: mouse".
		const mouseCursor = document.createElement('a-entity');
		mouseCursor.setAttribute('id', 'aframeInspectorMouseCursor');
		mouseCursor.setAttribute('cursor', 'rayOrigin', 'mouse');
		mouseCursor.setAttribute('data-aframe-inspector', true);
		mouseCursor.setAttribute('raycaster', {
			interval: 100,
			objects: 'a-scene :not([data-aframe-inspector])',
		});
		this.mouseCursor = mouseCursor;

		// Only visible objects.
		const raycaster = mouseCursor.components.raycaster;
		const refreshObjects = raycaster.refreshObjects;
		const overrideRefresh = () => {
			refreshObjects.call(raycaster);
			const objects = raycaster.objects;
			raycaster.objects = objects.filter(node => {
				while (node) {
					if (!node.visible) {
						return false;
					}
					node = node.parent;
				}
				return true;
			});
		};
		raycaster.refreshObjects = overrideRefresh;

		inspector.sceneEl.appendChild(mouseCursor);
		inspector.cursor = mouseCursor;

		inspector.sceneEl.addEventListener(
			'child-attached',
			debounce(() => {
				mouseCursor.components.raycaster.refreshObjects();
			}, 250),
		);

		mouseCursor.addEventListener('click', this.onClick);
		mouseCursor.addEventListener('mouseenter', this.onMouseEnter);
		mouseCursor.addEventListener('mouseleave', this.onMouseLeave);
		inspector.container.addEventListener('mousedown', this.onMouseDown);
		inspector.container.addEventListener('mouseup', this.onMouseUp);
		inspector.container.addEventListener('dblclick', this.onDoubleClick);

		inspector.sceneEl.canvas.addEventListener('mouseleave', () => {
			setTimeout(() => {
				EventTools.emit('raycastermouseleave', null);
			});
		});

		return {
			el: mouseCursor,
			enable: () => {
				mouseCursor.setAttribute('raycaster', 'enabled', true);
			},
			disable: () => {
				mouseCursor.setAttribute('raycaster', 'enabled', false);
			},
		};
	};

	getMousePosition(dom, x, y) {
		const rect = dom.getBoundingClientRect();
		return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];
	}

	onClick = (event) => {
		// Check to make sure not dragging.
		const DRAG_THRESHOLD = 0.03;
		if (this.onDownPosition.distanceTo(this.onUpPosition) >= DRAG_THRESHOLD) {
			return;
		}
		this.inspector.selectEntity(event.detail.intersectedEl);
	};

	onMouseEnter = (event) => {
		if (this.mouseCursor.components.cursor.intersectedEl.hasAttribute('material')) {
			this.mouseCursor.components.cursor.intersectedEl.currentEmissive = this.mouseCursor.components.cursor.intersectedEl.getAttribute(
				'material',
			).emissive;
			this.mouseCursor.components.cursor.intersectedEl.setAttribute('material', 'emissive', '#ff0000');
		}
		EventTools.emit('raycastermouseenter', this.mouseCursor.components.cursor.intersectedEl);
		event.target.sceneEl.canvas.style.cursor = 'pointer';
	};

	onMouseLeave = (event) => {
		if (this.mouseCursor.components.cursor.intersectedEl.hasAttribute('material')) {
			this.mouseCursor.components.cursor.intersectedEl.setAttribute(
				'material',
				'emissive',
				this.mouseCursor.components.cursor.intersectedEl.currentEmissive,
			);
		}
		EventTools.emit('raycastermouseleave', this.mouseCursor.components.cursor.intersectedEl);
		event.target.sceneEl.canvas.style.cursor = 'grab';
	};

	onMouseDown = (event) => {
		if (event instanceof CustomEvent) {
			return;
		}
		event.target.style.cursor = 'grabbing';
		event.preventDefault();
		const array = this.getMousePosition(this.inspector.container, event.clientX, event.clientY);
		this.onDownPosition.fromArray(array);
	};

	onMouseUp = (event) => {
		if (event instanceof CustomEvent) {
			return;
		}
		event.target.style.cursor = 'grab';
		event.preventDefault();
		const array = this.getMousePosition(this.inspector.container, event.clientX, event.clientY);
		this.onUpPosition.fromArray(array);
	};

	onDoubleClick = (event) => {
		const array = this.getMousePosition(this.inspector.container, event.clientX, event.clientY);
		this.onDoubleClickPosition.fromArray(array);
		const intersectedEl = this.mouseCursor.components.cursor.intersectedEl;
		if (!intersectedEl) {
			return;
		}
		EventTools.emit('objectfocus', intersectedEl.object3D);
	};

	onTouchStart = (event) => {
		const touch = event.changedTouches[0];
		const array = this.getMousePosition(this.inspector.container, touch.clientX, touch.clientY);
		this.onDownPosition.fromArray(array);
	};

	onTouchEnd = (event) => {
		const touch = event.changedTouches[0];
		const array = this.getMousePosition(this.inspector.container, touch.clientX, touch.clientY);
		this.onUpPosition.fromArray(array);
	};
}

export default RaycasterTools;
