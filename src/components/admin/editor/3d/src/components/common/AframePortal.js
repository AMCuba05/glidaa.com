import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';

//export type AframePortalType = 'ar' | 'default' | string;



class AframePortal extends PureComponent {
   

    static defaultProps = {
        scene: '',
        load: false,
        type: 'default',
    }

    constructor(props) {
        super(props);
        this.iframeEl = null;
        this.viewerEl = null;
    }

    componentDidMount() {
        const { load, type, scene } = this.props;
        this.head = this.iframeEl.contentDocument.head;
        const aframeScript = document.createElement('script') ;
        aframeScript.src = 'https://aframe.io/releases/0.9.2/aframe.min.js';
        aframeScript.async = true;
        aframeScript.onload = () => {
            const viewerEl = this.iframeEl.contentDocument.body.querySelector('#viewer') ;
            this.viewerEl = viewerEl;
            const aframeExtraScript = document.createElement('script') ;
            aframeExtraScript.src = 'https://cdn.rawgit.com/donmccurdy/aframe-extras/v6.0.0/dist/aframe-extras.min.js';
            aframeExtraScript.async = true;
            aframeExtraScript.onload = () => {
                if (load) {
                    this.handleAppendScene(scene);
                }
            }
            this.head.appendChild(aframeExtraScript);
            const aframeOrbitScript = document.createElement('script') ;
            aframeOrbitScript.src = 'https://unpkg.com/aframe-orbit-controls@1.2.0/dist/aframe-orbit-controls.min.js';
            aframeOrbitScript.async = true;
            this.head.appendChild(aframeOrbitScript);
            if (type === 'ar') {
                const aframeARScript = document.createElement('script') ;
                aframeARScript.src = './vendor/ar.js/aframe/build/aframe-ar.min.js';
                aframeARScript.async = true;
                aframeARScript.onload = () => {
                    if (load) {
                        this.handleAppendScene(scene);
                    }
                };
                this.head.appendChild(aframeARScript);
            }
        };
        this.head.appendChild(aframeScript);
        this.body = this.iframeEl.contentDocument.body;
        this.body.style.margin = '0';
        this.forceUpdate();
    }

    /**
     * @description Enable orbit controls
     * @param {Element} sceneEl
     */
    handleCameraControls = (sceneEl) => {
        const { type } = this.props;
        sceneEl.addEventListener('loaded', () => {
            if (sceneEl.camera.el.hasAttribute('orbit-controls')) {
                sceneEl.camera.el.setAttribute('orbit-controls', 'enabled', true);
            }
            if (type === 'ar') {
                // sceneEl.removeAttribute('vr-mode-ui');
                sceneEl.removeAttribute('screenshot');
                sceneEl.removeAttribute('inspector');
                sceneEl.removeAttribute('keyboard-shortcuts');
            } else {
                sceneEl.camera.el.setAttribute('camera', 'active', true);
            }
        });
    }

    /**
     * @description Append scene
     */
    handleAppendScene = (scene) => {
        this.viewerEl.innerHTML = scene;
        const sceneEl = this.viewerEl.querySelector('a-scene');
        this.handleCameraControls(sceneEl);
    }

    render() {
        const { children, scene, type, load, ...other } = this.props;
        return (
            <iframe ref={c => { this.iframeEl = c; }} {...other}>
                {this.body && createPortal(<div id="viewer" />, this.body)}
            </iframe>
        );
    }
}

export default AframePortal;
