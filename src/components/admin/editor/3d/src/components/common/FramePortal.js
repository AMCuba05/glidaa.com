import React, { PureComponent } from 'react';
import { createPortal } from 'react-dom';

class FramePortal extends PureComponent {
    constructor(props) {
        super(props);
        this.iframeEl = null;
    }

    componentDidMount() {
        this.head = this.iframeEl.contentDocument.head;
        if (this.props.head) {
            const headFragment = document.createRange().createContextualFragment(this.props.head.toString());
            this.head.appendChild(headFragment);
        }
        this.body = this.iframeEl.contentDocument.body;
        this.body.style.margin = '0';
        this.forceUpdate();
    }

    render() {
        const { children, head, ...other } = this.props;
        return (
            <iframe ref={c => { this.iframeEl = c; }} {...other}>
                {typeof head !== 'string' && this.head && createPortal(head, this.head)}
                {this.body && createPortal(children, this.body)}
            </iframe>
        );
    }
}

export default FramePortal;
